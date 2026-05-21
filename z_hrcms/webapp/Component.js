sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/dp/zhrcms/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models,JSONModel) => {
    "use strict";

    return UIComponent.extend("com.dp.zhrcms.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            var model=new JSONModel("/model/Human_Resource_Table.json")
             this.setModel(model,"resorceTable")
        }
    });
});