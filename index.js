    <apex:outputPanel id="dummyPanel">
        <!-- 使用 apex:outputText 将 showPopup 的值渲染到页面 -->
        <apex:outputText id="showPopupValue" value="{!IF(showPopup, 'true', 'false')}" style="display:none;" />
    </apex:outputPanel>

        var showPopup = document.getElementById("showPopupValue").innerText.trim();
        
        
        
        <apex:page controller="MyController">
    <h1>Visualforce 页面示例</h1>

    <!-- 点击按钮触发第一个 Apex 方法 -->
    <apex:commandLink value="点击此处" onclick="executeFirstMethod(); return false;" />

    <!-- 空的 outputPanel，用于触发 reRender 更新页面 -->
    <apex:outputPanel id="dummyPanel"></apex:outputPanel>

    <!-- 定义 actionFunction 执行第一个 Apex 方法 -->
    <apex:actionFunction name="executeFirstApexMethod" action="{!firstApexMethod}" reRender="dummyPanel" 
                         oncomplete="conditionallyShowPopup();" />

    <!-- 第二个 Apex 方法，通过 actionFunction 调用 -->
    <apex:actionFunction name="callSecondApexMethod" action="{!secondApexMethod}" />

    <script>
        // JavaScript 函数，用于调用第一个 Apex 方法
        function executeFirstMethod() {
            executeFirstApexMethod(); // 执行第一个 Apex 方法
        }

        // 根据 showPopup 的值决定是否显示弹出框
        function conditionallyShowPopup() {
            // 在 reRender 完成后，获取更新后的 showPopup 值
            var showPopup = {!IF(showPopup, 'true', 'false')};

            if (showPopup === 'true') {
                // 显示确认框，询问用户是否继续
                var userConfirmed = confirm("第一个 Apex 方法执行完成！是否继续跳转到下一个页面？");

                // 如果用户点击了“OK”，则调用第二个 Apex 方法；否则什么都不做
                if (userConfirmed) {
                    callSecondApexMethod();
                }
            }
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
