<apex:page controller="QuoteCopyController" sidebar="false" showHeader="true">
    <apex:form id="mainForm">

        <!-- ✅ 当前的見積明細（編集可能） -->
        <apex:pageBlock title="現在の見積明細" id="quoteDetailsBlock">
            <apex:pageBlockTable value="{!currentQuoteDetails}" var="qd">
                <apex:column value="{!qd.Name}" headerValue="項目名" />
                <apex:column headerValue="説明">
                    <apex:inputText value="{!qd.Description__c}" />
                </apex:column>
                <apex:column headerValue="数量">
                    <apex:inputText value="{!qd.Quantity__c}" />
                </apex:column>
            </apex:pageBlockTable>
        </apex:pageBlock>

        <!-- ✅ モーダルボタン -->
        <apex:commandButton value="他の見積からコピー" onclick="openModal(); return false;" styleClass="btn" />

        <!-- ✅ モーダルダイアログ -->
        <div id="copyModal" style="display:none; position:fixed; top:10%; left:10%; width:80%; height:80%; background:#fff; border:1px solid #ccc; padding:20px; z-index:9999; overflow:auto;">
            <h3>他の見積を検索</h3>

            <!-- ✅ 検索条件 -->
            <label>取引先名:</label>
            <apex:inputText value="{!searchAccountName}" />
            <br/>
            <label>商談名:</label>
            <apex:inputText value="{!searchOpportunityName}" />
            <br/>
            <label>Owner ID:</label>
            <apex:inputText value="{!searchOwnerId}" />
            <br/>
            <apex:commandButton value="検索" action="{!searchQuotes}" rerender="quoteResults" styleClass="btn" />

            <!-- ✅ 見積検索結果 -->
            <apex:outputPanel id="quoteResults">
                <apex:pageBlock title="検索結果: 見積">
                    <apex:pageBlockTable value="{!searchQuoteWrappers}" var="q">
                        <apex:column headerValue="選択">
                            <apex:inputCheckbox value="{!q.selected}" />
                        </apex:column>
                        <apex:column value="{!q.quote.Name}" headerValue="見積名" />
                        <apex:column value="{!q.quote.Account.Name}" headerValue="取引先" />
                        <apex:column value="{!q.quote.Opportunity.Name}" headerValue="商談" />
                    </apex:pageBlockTable>
                    <apex:commandButton value="見積明細を表示" action="{!loadQuoteDetailsFromSelection}" rerender="detailResults" styleClass="btn" />
                </apex:pageBlock>
            </apex:outputPanel>

            <!-- ✅ 見積明細表示部 -->
            <apex:outputPanel id="detailResults">
                <apex:pageBlock title="見積明細選択">
                    <apex:pageBlockTable value="{!searchDetailWrappers}" var="d">
                        <apex:column headerValue="選択">
                            <apex:inputCheckbox value="{!d.selected}" />
                        </apex:column>
                        <apex:column value="{!d.detail.Name}" headerValue="項目名" />
                        <apex:column value="{!d.detail.Description__c}" headerValue="説明" />
                        <apex:column value="{!d.detail.Quantity__c}" headerValue="数量" />
                    </apex:pageBlockTable>
                </apex:pageBlock>
            </apex:outputPanel>

            <apex:commandButton value="コピー" action="{!copySelectedDetails}" rerender="quoteDetailsBlock" oncomplete="closeModal();" styleClass="btn" />
            <input type="button" value="閉じる" onclick="closeModal();" class="btn" />
        </div>
    </apex:form>

    <!-- ✅ JS -->
    <script>
        function openModal() {
            document.getElementById('copyModal').style.display = 'block';
        }
        function closeModal() {
            document.getElementById('copyModal').style.display = 'none';
        }
    </script>

    <style>
        .btn {
            background-color: #0070d2;
            color: white;
            padding: 6px 12px;
            margin: 6px;
            border: none;
            border-radius: 4px;
        }
    </style>
</apex:page>


public class QuoteCopyController {

    public List<QuoteDetail__c> currentQuoteDetails { get; set; }
    public String searchAccountName { get; set; }
    public String searchOpportunityName { get; set; }
    public String searchOwnerId { get; set; }

    public List<QuoteWrapper> searchQuoteWrappers { get; set; }
    public List<QuoteDetailWrapper> searchDetailWrappers { get; set; }

    public QuoteCopyController() {
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        currentQuoteDetails = [SELECT Name, Description__c, Quantity__c FROM QuoteDetail__c WHERE Quote__c = :quoteId];
    }

    public void searchQuotes() {
        String query = 'SELECT Id, Name, Account.Name, Opportunity.Name FROM Quote WHERE Name != null';
        if (String.isNotBlank(searchAccountName)) {
            query += ' AND Account.Name LIKE \'%' + String.escapeSingleQuotes(searchAccountName) + '%\'';
        }
        if (String.isNotBlank(searchOpportunityName)) {
            query += ' AND Opportunity.Name LIKE \'%' + String.escapeSingleQuotes(searchOpportunityName) + '%\'';
        }
        if (String.isNotBlank(searchOwnerId)) {
            query += ' AND OwnerId = \'' + String.escapeSingleQuotes(searchOwnerId) + '\'';
        }

        List<Quote> result = Database.query(query);
        if (result.size() > 50) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, '検索結果が50件を超えました。絞り込んでください。'));
            return;
        }

        searchQuoteWrappers = new List<QuoteWrapper>();
        for (Quote q : result) {
            searchQuoteWrappers.add(new QuoteWrapper(q));
        }
    }

    public void loadQuoteDetailsFromSelection() {
        Set<Id> selectedQuoteIds = new Set<Id>();
        for (QuoteWrapper wrap : searchQuoteWrappers) {
            if (wrap.selected) {
                selectedQuoteIds.add(wrap.quote.Id);
            }
        }

        searchDetailWrappers = new List<QuoteDetailWrapper>();
        if (!selectedQuoteIds.isEmpty()) {
            List<QuoteDetail__c> details = [
                SELECT Id, Name, Description__c, Quantity__c, Quote__c
                FROM QuoteDetail__c
                WHERE Quote__c IN :selectedQuoteIds
            ];
            for (QuoteDetail__c d : details) {
                searchDetailWrappers.add(new QuoteDetailWrapper(d));
            }
        }
    }

    public void copySelectedDetails() {
        Id quoteId = ApexPages.currentPage().getParameters().get('quoteId');
        List<QuoteDetail__c> toInsert = new List<QuoteDetail__c>();
        for (QuoteDetailWrapper wrap : searchDetailWrappers) {
            if (wrap.selected) {
                QuoteDetail__c copy = wrap.detail.clone(false, false, false, false);
                copy.Quote__c = quoteId;
                toInsert.add(copy);
            }
        }
        if (!toInsert.isEmpty()) {
            insert toInsert;
        }

        // 再取得
        currentQuoteDetails = [SELECT Name, Description__c, Quantity__c FROM QuoteDetail__c WHERE Quote__c = :quoteId];
    }

    public class QuoteWrapper {
        public Quote quote { get; set; }
        public Boolean selected { get; set; }
        public QuoteWrapper(Quote q) {
            this.quote = q;
            this.selected = false;
        }
    }

    public class QuoteDetailWrapper {
        public QuoteDetail__c detail { get; set; }
        public Boolean selected { get; set; }
        public QuoteDetailWrapper(QuoteDetail__c d) {
            this.detail = d;
            this.selected = false;
        }
    }
}





```
az keyvault show --name <KeyVault名> --resource-group <リソースグループ名> --query properties.softDeleteRetentionInDays
```

    function afterClose() {
    if (dto.fClose) {
        var openStandardPage = "[{!$Resource.SR_HTML_OpenStandardPage}" + 
            "?openURL=" + encodeURIComponent("/{!dto.mitsumori.Id}");

        window.open(openStandardPage, '', 'width=0px, height=0px');

        // 确保母页面存在并且没有关闭
        if (window.opener && !window.opener.closed) {
            try {
                // 如果是 Lightning 页面，使用 Lightning API 刷新
                if (window.opener.$A) {
                    window.opener.$A.get('e.force:refreshView').fire();
                } else {
                    // Classic 页面使用 location.reload()
                    window.opener.location.reload();
                }
            } catch (e) {
                console.error("无法刷新母页面", e);
            }
        }

        // 关闭当前窗口
        setTimeout(function() {
            window.close();
        }, 500);
    }
}

```
function afterClose() {
    if (dto.fClose) {
        var openStandardPage = "[{!$Resource.SR_HTML_OpenStandardPage}" + 
            "?openURL=" + encodeURIComponent("/{!dto.mitsumori.Id}");

        window.open(openStandardPage, '', 'width=0px, height=0px');
        
        // 刷新母页面
        if (window.opener && !window.opener.closed) {
            window.opener.location.reload();
        }

        // 关闭当前窗口
        window.close();
    }
}

````




public void moveFeedItemWithFiles(Id oldFeedItemId, Id newParentId) {
    // 1. 元の投稿（FeedItem）を取得
    FeedItem oldFeed = [SELECT Id, Body, Title FROM FeedItem WHERE Id = :oldFeedItemId];

    // 2. 新しい投稿を作成（ParentIdを変更）
    FeedItem newFeed = new FeedItem();
    newFeed.ParentId = newParentId;
    newFeed.Body = oldFeed.Body;
    newFeed.Title = oldFeed.Title;
    newFeed.Type = 'ContentPost'; // ファイル投稿
    insert newFeed;
    
    // 3. 旧投稿に添付されたファイルを取得
    List<ContentDocumentLink> oldLinks = [
        SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :oldFeedItemId
    ];

    // 4. 新しい投稿にファイルを紐づける
    List<ContentDocumentLink> newLinks = new List<ContentDocumentLink>();
    for (ContentDocumentLink link : oldLinks) {
        ContentDocumentLink newLink = new ContentDocumentLink();
        newLink.LinkedEntityId = newFeed.Id; // 新しい投稿に紐づける
        newLink.ContentDocumentId = link.ContentDocumentId;
        newLink.ShareType = 'V'; // Viewerとして設定
        newLinks.add(newLink);
    }
    insert newLinks;

    // 5. 元の投稿を削除（オプション）
    delete oldFeed;
}


NOT(
    REGEX(YearMonth__c, "^(19|20)\\d{2}(0[1-9]|1[0-2])$")
)
「YYYYMM形式（例：202403）で入力してください。」



Chatter の通知に関しては、メール通知とアプリケーション内通知（ベル通知）の設定が密接に関連しています。メール通知を無効にすると、ベル通知も受信できなくなる場合があります。詳細は上記の公式ドキュメントをご参照ください。


If your network security requirements primarily involve IP and port-level access control, NSG is sufficient.
If you require advanced threat detection (malicious traffic blocking) and application-layer filtering (website access control), Azure Firewall is the better choice.



Why Azure Virtual Network with NSG Makes Azure Firewall Unnecessary
In an Azure Virtual Network, Network Security Groups (NSG) can be used to control inbound and outbound traffic at both the subnet and network interface levels. This often makes Azure Firewall unnecessary for the following reasons:

Granular Traffic Control

NSGs allow for fine-grained control over network traffic by defining rules based on source/destination IP, port, and protocol.
They effectively restrict or allow traffic, ensuring only authorized communication between resources.
Cost Efficiency

NSGs are free and do not incur additional costs, whereas Azure Firewall is a paid service that charges based on usage and deployment.
Organizations looking to reduce expenses can achieve similar security without deploying Azure Firewall.
Low Latency & Performance Optimization

NSGs operate at the network level, making them highly efficient in processing traffic without introducing additional latency.
Azure Firewall, on the other hand, is a stateful firewall that may slightly impact performance due to deep packet inspection and rule processing.
Integration with Other Azure Security Services

NSGs work seamlessly with Azure Private Link, Application Gateway, and VPN Gateways, allowing for robust security policies without requiring an additional firewall layer.
Simplicity & Ease of Management

NSGs are simpler to configure and manage compared to Azure Firewall, which requires additional rules for both inbound and outbound traffic filtering.
For small to medium-sized networks, NSGs alone are often sufficient to meet security requirements.
When Azure Firewall is Still Needed
However, NSGs have some limitations. If you need features such as threat intelligence, full Layer 7 (application-level) filtering, or centralized logging and auditing, Azure Firewall may still be necessary.

Conclusion
If your security requirements are primarily network-level traffic control and you do not need advanced threat protection, NSGs can effectively replace Azure Firewall, leading to lower costs, improved performance, and simpler management.
