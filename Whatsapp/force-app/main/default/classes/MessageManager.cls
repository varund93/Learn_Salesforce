@RestResource(urlMapping='/Messages/*')
global with sharing class MessageManager {
    @HttpPost
    global static ID createMessage(String message, String mobile, String direction) {
        try{        
            List<Lead> leads = [SELECT Id FROM Lead where MobilePhone =: mobile];
            Message__c thisMessage = new Message__c();
            thisMessage.Message__c = message;
            if(leads.size()>0)
            {
                thisMessage.Lead__c = leads.get(0).Id;
            }
            thisMessage.Direction__c = direction;
            insert thisMessage;
            return thisMessage.Id;
        }
        catch(Exception e){
            return null;
        }        
    }   
}
