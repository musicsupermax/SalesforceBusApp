({
    getStatusQuantity: function (component, buses) {
        var inUse = 0;
        var available = 0;
        var total = 0;

        buses.forEach(function (bus) {
            if (bus.Status__c === "In Use") {
                inUse++;
                total++;
            } else if (bus.Status__c === "Available") {
                available++;
                total++;
            }
        });
        component.set("v.inUse", inUse);
        component.set("v.available", available);
        component.set("v.total", total);
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