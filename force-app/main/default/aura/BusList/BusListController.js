({
    doInit : function(component, event, helper) {
        var action = component.get("c.getBuses");
        action.setParams({accountId : component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.buses", response.getReturnValue());
                var buses = component.get("v.buses");
                helper.getStatusQuantity(component, buses);
            }
            else {
                helper.toastMessage("error", "Fail", "Failed with state");
            }
        });
        component.find("lineEditor").getNewRecord(
            "Bus_Line__c", null, false, $A.getCallback(function() {
                var rec = component.get("v.newLine");
                var error = component.get("v.lineError");
                if (error || (rec === null)) {
                    helper.toastMessage("error", "Error", "Error initial izing record template");
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
        $A.enqueueAction(action);
    },
    changeCreateWindowStatus: function(component, event, helper) {
        if (component.get("v.status") == "close") {
            component.set("v.status", "open");
        } else {
            component.set("v.status", "close");
        }
    },
    handleEventChanges: function(component, event, helper) {
        component.set("v.status", event.getParam("status"));
    },
    handleSelect: function(component, event, helper) {
        var parcedValue = event.getParam("value").split(',');
        var value = parcedValue[0];
        var label = parcedValue[1];
        component.set("v.busId", value);
        if (label === "Delete") {
            var action = component.get("c.deleteBus");
            action.setParams({busId : value});
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    helper.toastMessage("success", "Deleted", "The Bus deleted.");
                    $A.get("e.force:refreshView").fire();
                }
                else {
                    helper.toastMessage("error", "Fail", "Failed with state");
                }
            });
            $A.enqueueAction(action);
        } else if (label === "Add") {
            component.set("v.isOpen", "true");
        }
    },
    handleRemove: function(component, event, helper) {
        var busLineId = event.getSource().get('v.name').split(',');
        var lineIdValue = busLineId[0];
        var busIdValue = busLineId[1];
        var action = component.get("c.deleteLine");
        action.setParams({busId : busIdValue,
                         lineId :lineIdValue});
        action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    helper.toastMessage("success", "Deleted", "Line deleted");
                    $A.get("e.force:refreshView").fire();
                }
                else {
                    helper.toastMessage("error", "Fail", "Failed with state");
                }
            });
            $A.enqueueAction(action);
    }
})