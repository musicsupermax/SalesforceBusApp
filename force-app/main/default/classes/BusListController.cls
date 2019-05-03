public class BusListController {
    
    @AuraEnabled
    public static List<Bus__c> getBuses(String accountId) {
        return BusListService.getAllBuses(accountId);
    }
    
    @AuraEnabled
    public static void deleteBus(String busId) {
        BusListService.deleteCurrentBus(busId);
    }
    
    @AuraEnabled
    public static void deleteLine(String lineId, String busId) {
        BusListService.deleteCurrentLine(lineId, busId);
    }
}