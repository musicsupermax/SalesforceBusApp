public class BusListService {
    
    public static List<Bus__c> getAllBuses(String accountId) {
        List<Bus__c> buses;
        try {
            buses = [SELECT Id, Name, Status__c, Account__c, (SELECT Id, Bus__r.Id, Line__r.Name, Line__r.Id FROM Bus_Lines__r)
                     FROM Bus__c WHERE Account__c =: accountId WITH SECURITY_ENFORCED];
        } catch (QueryException e) {
            throw new NoAccessException('No access to object');
        }
        return buses;
    }
    
     public static void deleteCurrentBus(String busId) {
        Bus__c bus;
        try {
            bus = [SELECT Id, Name FROM Bus__c WHERE id =: busId WITH SECURITY_ENFORCED];
        } catch (QueryException e) {
            throw new NoAccessException('No access to object');
        }
        if (Schema.sObjectType.Bus__c.isDeletable()) {
            delete bus;
        }
    }
    
    public static void deleteCurrentLine(String lineId, String busId) {
        Bus_Line__c busLine;
        System.debug(lineId);
        try {
            busLine = [SELECT Id, Bus__c, Line__c FROM Bus_Line__c WHERE 
                       Bus__c =: busId AND Line__c =: lineId WITH SECURITY_ENFORCED];
            System.debug(busLine);
        } catch (QueryException e) {
            throw new NoAccessException('No access to object');
        }
        if (Schema.sObjectType.Bus__c.isDeletable()) {
            delete busLine;
        }
    }
}