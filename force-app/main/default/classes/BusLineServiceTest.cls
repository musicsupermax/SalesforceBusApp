@isTest
public class BusLineServiceTest {
      
    @testSetup static void setup() {
         Account account = new Account(Name='Test account');
         insert account;
         
         Bus__c bus = new Bus__c(Name='Test Bus', Account__c=Account.Id, Status__c='Available');
		 insert bus;	         
       
         Line__c line = new Line__c(Name='Test Line');
         insert line;
     }
    
   @isTest static void testChangeStatusBeforeInsert() {     
		Bus__c bus = [SELECT Id, Status__c FROM Bus__c WHERE Name='Test Bus' LIMIT 1]; 
     	Line__c line = [SELECT Id FROM Line__c WHERE Name='Test Line' LIMIT 1];
     
        Bus_Line__c busLine = new Bus_Line__c(Bus__c = bus.Id, Line__c = line.Id);
        insert busLine;
     
        System.assertEquals('In Use', [SELECT Id, Status__c FROM Bus__c 
                                       WHERE Name='Test Bus' LIMIT 1].Status__c);
     
    }
    
   @isTest static void testChangeStatusAfterDelete() {
       Bus__c bus = [SELECT Id, Status__c FROM Bus__c WHERE Name='Test Bus' LIMIT 1]; 
       Line__c line = [SELECT Id FROM Line__c WHERE Name='Test Line' LIMIT 1];
     
       Bus_Line__c busLine = new Bus_Line__c(Bus__c = bus.Id, Line__c = line.Id);
       insert busLine;
       delete busLine;
    
       System.assertEquals('Available', [SELECT Id, Status__c FROM Bus__c 
                                         WHERE Name = 'Test Bus' LIMIT 1].Status__c);
  }
}