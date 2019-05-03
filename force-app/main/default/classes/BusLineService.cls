public class BusLineService {
    
    private static final String IN_USE = 'In Use';
    private static final String AVAILABLE = 'Available';
    
    public void changeStatusBeforeInsert(List<Bus_Line__c> busLines) {
        List<Bus__c> buses = getRelatedBuses(busLines);
        for (Bus__c bus : buses) {
            bus.Status__c = IN_USE;
        }
        if (Schema.sObjectType.Bus__c.isUpdateable()) {
            update buses;
        }
    }
    
    public void changeStatusAfterDelete(List<Bus_Line__c> busLines) {
        List<Bus__c> buses = getRelatedBuses(busLines);
        for (Bus__c bus : buses) {
            if (bus.Bus_Lines__r.isEmpty()) {
                bus.Status__c = AVAILABLE;
            }
        }
        if (Schema.sObjectType.Bus__c.isUpdateable()) {
            update buses;
        }
    }
    
    public List<Bus__c> getRelatedBuses(List<Bus_Line__c> busLines) {
        List<Id> busIds = new List<Id>();
        for (Bus_Line__c busLine : busLines) {
            busIds.add(busLine.Bus__c);
        }
        List<Bus__c> buses = new List<Bus__c>();
        try {
            buses = [SELECT Id, Status__c, (SELECT Id FROM Bus_Lines__r) 
                     FROM Bus__c WHERE Id IN :busIds WITH SECURITY_ENFORCED];
        } catch (QueryException e) {
            throw new NoAccessException('No Access To Object');
        } 
        return buses; 
    }
}