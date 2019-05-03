public class LineController { 
    
    @AuraEnabled
    public static List<Line__c> getLines() {
        return LineService.getAllLines();
    }
    
    @AuraEnabled
    public static void addLine(String busId, String lineId) {
        try {
            LineService.addNewLine(busId, lineId);
        } catch(Exception e) {
            throw new AuraHandledException(e.getMessage());            
        }
    }
}