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
