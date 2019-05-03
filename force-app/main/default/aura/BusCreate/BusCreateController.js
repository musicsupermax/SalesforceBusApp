({
    doInit: function (component, event, helper) {
        component.find("recordEditor").getNewRecord(
            "Bus__c", null, false, $A.getCallback(function () {
                var rec = component.get("v.newRecord");
                var error = component.get("v.recordError");
                if (error || (rec === null)) {
                    console.log("Error initial	izing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
        component.find("busLineEditor").getNewRecord(
            "Bus_Line__c", null, false, $A.getCallback(function () {
                var rec = component.get("v.busLine");
                var error = component.get("v.busLineError");
                if (error || (rec === null)) {
                    console.log("Error initial	izing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
        helper.linesInit(component);
    },
    handleSaveRecord: function (component, event, helper) {
        var check;
        var buses = component.get("v.buses");
        var busName = component.get("v.simpleRecord.Name");
        buses.forEach(function (bus) {
            if (busName.toUpperCase() === bus.Name.toUpperCase()) {
                check = false;
            } else {
                check = true;
            }
        });
        if (check == false) {
            helper.toastMessage("error", "Error", "Bus has already exists");
        } else {
            if (component.get("v.simpleRecord.Name") === null) {
                helper.toastMessage("error", "Error", "Please, enter bus name");
                helper.closeCreateWindow(component);
            } else {
                component.set("v.simpleRecord.Account__c", component.get("v.recordId"));
                if (component.get("v.busLineSimpleRecord.Line__c") === null) {
                    helper.saveBus(component);
                } else {
                    helper.saveBusWithBusLine(component);
                }
            }
        }
    },
    closeWindow: function (component, event, helper) {
        helper.closeCreateWindow(component);
    }
})