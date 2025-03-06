```
sfdx force:lightning:component:create --type lwc --componentname myComponent --outputdir force-app/main/default/lwc
```

```
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata"
    fqn="StoreBatchProcessor">
    <apiVersion>58.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>

```

```
```



```
public class StoreBatchJob implements Database.Batchable<sObject>, Database.Stateful {
    private String processType;

    public StoreBatchJob(String processType) {
        this.processType = processType;
    }

    public Database.QueryLocator start(Database.BatchableContext BC) {
        if (processType == 'all') {
            return Database.getQueryLocator('SELECT Id, Name FROM Store__c'); // 所有店铺
        } else {
            return Database.getQueryLocator([
                SELECT Id, Name FROM Store__c WHERE OwnerId = :UserInfo.getUserId()
            ]); // 自己所属的店铺
        }
    }

    public void execute(Database.BatchableContext BC, List<Store__c> storeList) {
        for (Store__c store : storeList) {
            // 空的处理逻辑，可以在这里添加业务处理
            System.debug('Processing store: ' + store.Name);
        }
    }

    public void finish(Database.BatchableContext BC) {
        System.debug('Batch job completed');
    }
}

```


```
public with sharing class StoreBatchController {
    @AuraEnabled
    public static String startBatchJob(String processType) {
        try {
            StoreBatchJob batch = new StoreBatchJob(processType);
            Database.executeBatch(batch);
            return 'Batch Job Started Successfully';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}

```

```
import { LightningElement, track } from 'lwc';
import startBatchJob from '@apex/StoreBatchController.startBatchJob';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StoreBatchProcessor extends LightningElement {
    @track selectedOption = 'all'; // 默认选择 "所有店铺信息处理"
    @track processingMessage = ''; // 处理状态

    get options() {
        return [
            { label: '所有店铺信息处理', value: 'all' },
            { label: '自己所属的店铺信息处理', value: 'own' }
        ];
    }

    handleChange(event) {
        this.selectedOption = event.detail.value;
    }

    async handleNextPage() {
        this.processingMessage = '业务处理开始...'; // 业务处理开始
        try {
            const result = await startBatchJob({ processType: this.selectedOption });

            this.processingMessage = '处理中...'; // 处理中

            setTimeout(() => {
                this.processingMessage = '处理结束'; // 处理完成
                this.showToast('成功', result, 'success');
            }, 3000);
        } catch (error) {
            this.processingMessage = '处理失败';
            this.showToast('错误', error.body.message, 'error');
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
```

```
<template>
    <lightning-card title="店铺信息批量处理">
        <div class="slds-p-around_medium">
            <!-- 选择处理方式 -->
            <lightning-radio-group name="storeProcessType"
                label="请选择处理方式"
                options={options}
                value={selectedOption}
                onchange={handleChange}
                type="radio">
            </lightning-radio-group>

            <!-- 下一页按钮 -->
            <div class="slds-m-top_medium">
                <lightning-button label="下一页" variant="brand" onclick={handleNextPage}></lightning-button>
            </div>

            <!-- 处理状态信息 -->
            <div class="slds-m-top_medium">
                <lightning-formatted-text value={processingMessage}></lightning-formatted-text>
            </div>
        </div>
    </lightning-card>
</template>

```

