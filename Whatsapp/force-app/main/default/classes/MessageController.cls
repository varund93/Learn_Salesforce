public with sharing class MessageController {
    public MessageController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Message__c> findRelatedMessages(String recordId){
        if (String.isBlank(recordId)) {
            return new List<Message__c>();
        }
        
        return [SELECT Id, Sent__c, Message__c, CreatedDate FROM Message__c WHERE Lead__c = :recordId ORDER BY CreatedDate];        
    }
}
