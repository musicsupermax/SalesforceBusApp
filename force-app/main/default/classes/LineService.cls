public class LineService {
    
	 public static List<Line__c> getAllLines() {
        List<Line__c> lines;
        try {
            lines = [SELECT Id, Name FROM Line__c WITH SECURITY_ENFORCED];
        } catch (QueryException e) {
            throw new NoAccessException('No access to object');
        }
        return lines;
    }
    
     public static void addNewLine(String busId, String lineId) {
        System.debug(busId);
        System.debug(lineId);
        List<Bus_Line__c> busLines;
        try {
            busLines = [SELECT Id, Bus__c, Line__c FROM Bus_Line__c WHERE Bus__c =: busId AND Line__c =: lineId WITH SECURITY_ENFORCED];
        }
        catch (QueryException e) {
            throw new NoAccessException('No access to object');
        }
         if (busLines.size() >= 1) {
            throw new NoAccessException('No access to object');
         } else {
             Bus_Line__c newBusLine = new Bus_Line__c(Bus__c = busId, Line__c = lineId);
             insert newBusLine;
         }
    }
}