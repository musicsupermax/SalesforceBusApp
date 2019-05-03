({
    doInit: function (component, event, helper) {
        helper.linesInit(component);
    },
    closeWindow: function (component) {
        component.set("v.isOpen", false);
    },
    handleSaveRecord: function (component, event, helper) {
        if (component.get("v.lineId") != null) {
            var action = component.get("c.addLine");
            action.setParams({
                busId: component.get("v.busId"),
                lineId: component.get("v.lineId")
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.isOpen", false);
                    $A.get("e.force:refreshView").fire();
                    helper.toastMessage("success", "Success", "Line added");
                }
                else {
                    helper.toastMessage("error", "Fail", "This Line has already assigned");
                }
            });
            $A.enqueueAction(action);
        } else {
            helper.toastMessage("error", "Error", "Please choose line");
            component.set("v.isOpen", false);
        }
    }
})