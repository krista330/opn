<apex:page controller="MyController">
    <h1>Visualforce 页面示例</h1>
    
    <!-- 触发第一个 Apex 方法 -->
    <apex:commandLink value="点击此处" action="{!firstApexMethod}" reRender="dummyPanel" 
                      onclick="showPopup(); return false;" />

    <!-- 空的 outputPanel，用于触发 reRender -->
    <apex:outputPanel id="dummyPanel"></apex:outputPanel>

    <!-- 第二个 Apex 方法，通过 actionFunction 调用 -->
    <apex:actionFunction name="callSecondApexMethod" action="{!secondApexMethod}" />

    <script>
        // 显示弹出框
        function showPopup() {
            // 显示弹出框
            alert("第一个 Apex 方法执行完成！");

            // 关闭弹出框后调用第二个Apex方法
            callSecondApexMethod();
        }
    </script>
</apex:page>
                          
アプリケーションのコードやキャッシングの最適化が行われた場合、メモリ使用率が一時的に高くても安定して処理できることがあります。


75％: 通常の使用状況における初期警告として設定します。この時点で、リソース消費が増加し始めたことを検知できるため、問題の兆候を早めにキャッチできます。
85％: CPUリソースの利用が高まっていることを示す次の警告レベルです。このレベルでは、負荷分散の見直しやリソーススケーリングの準備を始めることが推奨されます。
90％～95％: 非常に高い負荷状態で、パフォーマンスの低下やリクエストの遅延が発生する可能性があります。この段階で、アプリケーションのスケールアップやスケールアウトが必要です。

1. DTUのアップグレード
負荷に対応できるように、より高いDTUプランへのアップグレードが推奨されます。現在400 DTUを使用している場合、次のプランを検討できます。

600 DTU: 現在のDTU消費が頻繁に100％に達する場合、少なくとも50％のリソース増加を検討します。600 DTUにスケールアップすることで、余裕を持って負荷に対応できる可能性があります。
800 DTU: 負荷の急増や将来の拡張を見据えて、さらに余裕を持たせたい場合は、800 DTUへのスケールアップもオプションです。これにより、リソース不足によるパフォーマンスの低下を防げます。

public class MyController {
    public String timeHHmm { get; set; }
    public MyObject__c myRecord { get; set; }

    public MyController() {
        myRecord = [SELECT Id, TimeField__c FROM MyObject__c WHERE Id = :ApexPages.currentPage().getParameters().get('id')];
        if (myRecord.TimeField__c != null) {
            timeHHmm = myRecord.TimeField__c.format('HH:mm');
        }
    }

    public void save() {
        if (String.isNotBlank(timeHHmm)) {
            List<String> timeParts = timeHHmm.split(':');
            Integer hours = Integer.valueOf(timeParts[0]);
            Integer minutes = Integer.valueOf(timeParts[1]);
            myRecord.TimeField__c = Time.newInstance(hours, minutes, 0, 0);
            update myRecord;
        }
    }
}


<apex:page controller="MyController">
    <apex:form>
        <apex:inputText value="{!timeHHmm}" label="Time (HH:mm)" />
        <apex:commandButton value="Save" action="{!save}" />
    </apex:form>
</apex:page>



public class TimeFormatValidator {
    public static void validateTimeFormat(String input) {
        // 正規表現パターン: 00:00から23:59までの時間形式
        String timePattern = '^([01]?[0-9]|2[0-3]):[0-5][0-9]$';
        
        // 入力が正規表現パターンに一致しない場合、エラーをスロー
        if (!Pattern.matches(timePattern, input)) {
            throw new TimeFormatException('Invalid time format. Please use hh:mm format.');
        }
    }
    
    // カスタム例外クラス
    public class TimeFormatException extends Exception {}
}
