sap.ui.define([], function () {
    "use strict";

    return {

onTextColor: function (status) {
    if (status === "New") {
        return "Information";
    } else if (status === "Completed") {
        return "Success";
    } else if (status === "In Progress") {
        return "Warning";
    } else if (status === "Rejected") {
        return "Error";
    } 
}
         };
});