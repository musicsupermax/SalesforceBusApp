({
    linesInit: function (component) {
        var action = component.get("c.getLines");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.lines", response.getReturnValue());
                console.log("Success: " + state);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    toastMessage: function (type, title, message) {
        var resultsToast = $A.get("e.force:showToast");
        if (resultsToast != undefined) {
            resultsToast.setParams({
                type: type,
                title: title,
                message: message
            });
            resultsToast.fire();
        }
    }
})