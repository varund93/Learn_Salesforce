trigger MessageTrigger on Message__c (after insert) {
    for(Message__c m: [Select Id, Message__c, Mobile__c from Message__c where Id in :Trigger.New and Direction__c='Sent'])
    {        
        MessageCallouts.SendMessage(m.Message__c, m.Mobile__c);
    }
}