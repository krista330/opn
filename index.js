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
