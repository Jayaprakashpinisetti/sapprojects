sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], (Controller, formatter, Filter, FilterOperator, Sorter) => {
    "use strict";

    return Controller.extend("com.dp.zhrcms.controller.Icon_Tab_Bar_Filter", {
        formatter: formatter,
        onInit() {
            this.sortDesc = false;
        },
        onBeforeRendering: function () {
            debugger
            var table = this.getView().byId("humanResourceTable")
            var count = table.getItems().length
            this.getView().byId("onRecordIcon").setCount(count)
            this.getView().byId("onTableCount").setText("Total Records" + ":" + "(" + count + ")")
            var model = this.getOwnerComponent().getModel("resorceTable");
            var data = model.getProperty("/humanResourceDetails");
            var newCount = 0;
            var completedCount = 0;
            var progressCount = 0;
            var rejectCount = 0;
            this.BoridingCount = 0;
            this.ChangeOfCondition = 0;
            this.Demobilise = 0;
            this.Exteded = 0;

            for (var i = 0; i < data.length; i++) {
                if (data[i].Status === "New") {
                    newCount++
                } else if (data[i].Status === "Completed") {
                    completedCount++
                } else if (data[i].Status === "In Progress") {
                    progressCount++
                } else if (data[i].Status === "Rejected") {
                    rejectCount++
                }
            }
            this.getView().byId("onNewIcon").setCount(newCount)
            this.getView().byId("oncompletedIcon").setCount(completedCount)
            this.getView().byId("onProgressIcon").setCount(progressCount)
            this.getView().byId("onRejectIcon").setCount(rejectCount)



            for (var i = 0; i < data.length; i++) {
                if (data[i].reqType === "01" && data[i].reqSubType === "") {
                    this.BoridingCount++

                } else if (data[i].reqType === "02" && data[i].reqSubType === "") {
                    this.ChangeOfCondition++
                } else if (data[i].reqType === "01" && data[i].reqSubType === "AB") {
                    this.Demobilise++
                } else if (data[i].reqType === "02" && data[i].reqSubType === "XY")
                    this.Exteded++
            }
            this.getView().byId("new_onBoardig_Id").setCount(this.BoridingCount)
            this.getView().byId("new_Change_of_Conditions_Id").setCount(this.ChangeOfCondition)
            this.getView().byId("new_DEMOBILISE_Id").setCount(this.Demobilise)
            this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(this.Exteded)
        },
        onIconSelect: function (oEvent) {
            debugger
            this.getView().byId("globalSearch").setValue("")
            this.keys = oEvent.getParameter("key")
            var table = this.getView().byId("humanResourceTable")
            var onBinding = table.getBinding("items")
            this.getView().byId("new_onBoardig_Id").setVisible(true)
            this.getView().byId("new_Change_of_Conditions_Id").setVisible(true)
            this.getView().byId("new_DEMOBILISE_Id").setVisible(true)
            this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(true)
            var model = this.getOwnerComponent().getModel("resorceTable");
            var data = model.getProperty("/humanResourceDetails");
            var onBordingCount = 0;
            var changeOfCondition = 0;
            var demobiliseCount = 0;
            var extendedEndDateCount = 0;
            var filter = [];


            if (this.keys === "NEW") {
                filter.push(new Filter("Status", FilterOperator.EQ, "New"))


                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status === "New" && data[i].reqType === "01" && data[i].reqSubType === "") {
                        onBordingCount++
                    } else if (data[i].Status === "New" && data[i].reqType === "02" && data[i].reqSubType === "") {
                        changeOfCondition++
                    } else if (data[i].Status === "New" && data[i].reqType === "01" && data[i].reqSubType === "AB") {
                        demobiliseCount++
                    } else if (data[i].Status === "New" && data[i].reqType === "02" && data[i].reqSubType === "XY")
                        extendedEndDateCount++
                }

                if (onBordingCount === 0) {
                    this.getView().byId("new_onBoardig_Id").setVisible(false)
                } else {
                    this.getView().byId("new_onBoardig_Id").setCount(onBordingCount)
                }
                if (changeOfCondition === 0) {
                    this.getView().byId("new_Change_of_Conditions_Id").setVisible(false)
                } else {

                    this.getView().byId("new_Change_of_Conditions_Id").setCount(changeOfCondition)
                }
                if (demobiliseCount === 0) {
                    this.getView().byId("new_DEMOBILISE_Id").setVisible(false)
                } else {

                    this.getView().byId("new_DEMOBILISE_Id").setCount(demobiliseCount)
                }

                if (extendedEndDateCount === 0) {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(extendedEndDateCount)

                }

                this.getView().byId("new_Select").setSelectedKey("new_Record")
                this.key = "new_Record"

            } else if (this.keys === "COMPLETED") {
                filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status === "Completed" && data[i].reqType === "01" && data[i].reqSubType === "") {
                        onBordingCount++

                    } else if (data[i].Status === "Completed" && data[i].reqType === "02" && data[i].reqSubType === "") {
                        changeOfCondition++
                    } else if (data[i].Status === "Completed" && data[i].reqType === "01" && data[i].reqSubType === "AB") {
                        demobiliseCount++
                    } else if (data[i].Status === "Completed" && data[i].reqType === "02" && data[i].reqSubType === "XY")
                        extendedEndDateCount++
                }

                if (onBordingCount === 0) {
                    this.getView().byId("new_onBoardig_Id").setVisible(false)
                } else {
                    this.getView().byId("new_onBoardig_Id").setCount(onBordingCount)
                }

                if (changeOfCondition === 0) {
                    this.getView().byId("new_Change_of_Conditions_Id").setVisible(false)
                } else {
                    this.getView().byId("new_Change_of_Conditions_Id").setCount(changeOfCondition)
                }

                if (demobiliseCount === 0) {
                    this.getView().byId("new_DEMOBILISE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_DEMOBILISE_Id").setCount(demobiliseCount)

                }
                if (extendedEndDateCount === 0) {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(extendedEndDateCount)
                }
                this.getView().byId("new_Select").setSelectedKey("new_Record")
                this.key = "new_Record"
            } else if (this.keys === "PROGRESS") {
                filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status === "In Progress" && data[i].reqType === "01" && data[i].reqSubType === "") {
                        onBordingCount++

                    } else if (data[i].Status === "In Progress" && data[i].reqType === "02" && data[i].reqSubType === "") {
                        changeOfCondition++
                    } else if (data[i].Status === "In Progress" && data[i].reqType === "01" && data[i].reqSubType === "AB") {
                        demobiliseCount++
                    } else if (data[i].Status === "In Progress" && data[i].reqType === "02" && data[i].reqSubType === "XY")
                        extendedEndDateCount++
                }
                if (onBordingCount === 0) {
                    this.getView().byId("new_onBoardig_Id").setVisible(false)
                } else {
                    this.getView().byId("new_onBoardig_Id").setCount(onBordingCount)
                }
                if (changeOfCondition === 0) {
                    this.getView().byId("new_Change_of_Conditions_Id").setVisible(false)
                } else {
                    this.getView().byId("new_Change_of_Conditions_Id").setCount(changeOfCondition)
                }
                if (demobiliseCount === 0) {
                    this.getView().byId("new_DEMOBILISE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_DEMOBILISE_Id").setCount(demobiliseCount)
                }
                if (extendedEndDateCount === 0) {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(extendedEndDateCount)
                }
                this.getView().byId("new_Select").setSelectedKey("new_Record")
                this.key = "new_Record"
            } else if (this.keys === "REJECT") {
                filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status === "Rejected" && data[i].reqType === "01" && data[i].reqSubType === "") {
                        onBordingCount++
                    } else if (data[i].Status === "Rejected" && data[i].reqType === "02" && data[i].reqSubType === "") {
                        changeOfCondition++
                    } else if (data[i].Status === "Rejected" && data[i].reqType === "01" && data[i].reqSubType === "AB") {
                        demobiliseCount++
                    } else if (data[i].Status == "Rejected" && data[i].reqType == "02" && data[i].reqSubType == "XY")
                        extendedEndDateCount++
                }

                if (onBordingCount === 0) {
                    this.getView().byId("new_onBoardig_Id").setVisible(false)
                } else {
                    this.getView().byId("new_onBoardig_Id").setCount(onBordingCount)
                }
                if (changeOfCondition === 0) {
                    this.getView().byId("new_Change_of_Conditions_Id").setVisible(false)
                } else {
                    this.getView().byId("new_Change_of_Conditions_Id").setCount(changeOfCondition)
                }
                if (demobiliseCount === 0) {
                    this.getView().byId("new_DEMOBILISE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_DEMOBILISE_Id").setCount(demobiliseCount)
                }
                if (extendedEndDateCount === 0) {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(false)
                } else {
                    this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(extendedEndDateCount)
                }
                this.getView().byId("new_Select").setSelectedKey("new_Record")
                this.key = "new_Record"
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].reqType === "01" && data[i].reqSubType === "") {
                        onBordingCount++
                    } else if (data[i].reqType === "02" && data[i].reqSubType === "") {
                        changeOfCondition++
                    } else if (data[i].reqType === "01" && data[i].reqSubType === "AB") {
                        demobiliseCount++
                    } else if (data[i].reqType == "02" && data[i].reqSubType == "XY")
                        extendedEndDateCount++
                }


                this.getView().byId("new_onBoardig_Id").setCount(onBordingCount)


                this.getView().byId("new_Change_of_Conditions_Id").setCount(changeOfCondition)


                this.getView().byId("new_DEMOBILISE_Id").setCount(demobiliseCount)


                this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(extendedEndDateCount)

                this.getView().byId("new_Select").setSelectedKey("new_Record")
                this.key = "new_Record"
            }
            onBinding.filter(filter);

        },

        onHeaderSelect: function (oEvent) {
            debugger
            this.getView().byId("globalSearch").setValue("")
            this.key = oEvent.getParameter("key")

            var table = this.getView().byId("humanResourceTable")
            var onBinding = table.getBinding("items")
            this.filter = [];
            if (this.keys === "NEW") {
                if (this.key === "new_Record") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "New"))
                } else if (this.key === "New_onBoardig") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "New"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_Change_of_Conditions") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "New"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_DEMOBILISE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "New"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "New"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                }

            }
            else if (this.keys === "COMPLETED") {
                if (this.key === "new_Record") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                } else if (this.key === "New_onBoardig") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_Change_of_Conditions") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_DEMOBILISE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                }
            } else if (this.keys === "PROGRESS") {
                if (this.key === "new_Record") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                } else if (this.key === "New_onBoardig") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_Change_of_Conditions") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_DEMOBILISE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                }
            } else if (this.keys === "REJECT") {
                if (this.key === "new_Record") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                } else if (this.key === "New_onBoardig") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_Change_of_Conditions") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_DEMOBILISE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    this.filter.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                }
            } else {
                if (this.key === "New_onBoardig") {
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_Change_of_Conditions") {
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                } else if (this.key === "new_DEMOBILISE") {
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    this.filter.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    this.filter.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                }
            }

            onBinding.filter(this.filter);
        },
        onRefresh: function () {
            debugger
            this.getView().byId("new_onBoardig_Id").setVisible(true)
            this.getView().byId("new_Change_of_Conditions_Id").setVisible(true)
            this.getView().byId("new_DEMOBILISE_Id").setVisible(true)
            this.getView().byId("new_EXTENDED_END_DATE_Id").setVisible(true)
            this.BoridingCount
            this.ChangeOfCondition
            this.Demobilise
            this.Exteded
            this.getView().byId("new_onBoardig_Id").setCount(this.BoridingCount)
            this.getView().byId("new_Change_of_Conditions_Id").setCount(this.ChangeOfCondition)
            this.getView().byId("new_DEMOBILISE_Id").setCount(this.Demobilise)
            this.getView().byId("new_EXTENDED_END_DATE_Id").setCount(this.Exteded)

            this.getView().byId("onIconTab").setSelectedKey("RECORDS")
            this.getView().byId("new_Select").setSelectedKey("new_Record")
            this.getView().byId("globalSearch").setValue("");
            this.keys = "RECORDS";
            this.key = "new_Record";
            var table = this.getView().byId("humanResourceTable");
            var binding = table.getBinding("items");
            var filter = []
            binding.filter(filter)
            binding.sort()
            this.sortDesc = false;
        },
        onSort: function () {
            debugger;

            var table = this.getView().byId("humanResourceTable");
            var binding = table.getBinding("items");

            if (this.sortDesc === false) {

                var sorter = new Sorter("sourceName", false);
                binding.sort(sorter);

                this.sortDesc = true;
            } else {
                var sorter = new Sorter("sourceName", true);
                binding.sort(sorter)
                this.sortDesc = false;
            }
        },
        onGroupBy: function () {
            debugger
            var table = this.getView().byId("humanResourceTable")
            var binding = table.getBinding("items")
            var sorter = new Sorter("Priority", false, true)
            binding.sort(sorter)
        },
        onSearch: function () {
            debugger

            var Value = this.getView().byId("globalSearch").getValue().trim();
            var table = this.getView().byId("humanResourceTable");
            var binding = table.getBinding("items");
            var filters = [];
            this.onFilter = new Filter({
                filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                new Filter("Priority", FilterOperator.Contains, Value),
                new Filter("DateCreated", FilterOperator.Contains, Value),
                new Filter("Status", FilterOperator.Contains, Value),
                new Filter("Department", FilterOperator.Contains, Value),
                new Filter("location", FilterOperator.Contains, Value),
                new Filter("reqType", FilterOperator.Contains, Value),
                new Filter("reqSubType", FilterOperator.Contains, Value),
                ], and: false

            })
            if (this.keys === "RECORDS") {
                if (this.key === "new_Record") {
                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                }


                else if (this.key === "New_onBoardig") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // // filters.push(new Filter("Status", FilterOperator.Contains, "Rejected"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_Change_of_Conditions") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_DEMOBILISE") {

                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_EXTENDED_END_DATE") {

                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))


                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })

                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                }
            } else if (this.keys === "NEW") {
                if (this.key === "New_onBoardig") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "New"))
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    // var newFilter=new Filter({filters:[new Filter(data)],and:true
                    // })
                    // filters.push(data)
                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })

                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_Change_of_Conditions") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "New"))
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value)
                    //     ], and: false

                    // })


                    // filters.push(onFilter)
                } else if (this.key === "new_DEMOBILISE") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "New"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)

                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "New"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)

                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                }
                else {
                    filters.push(new Filter("Status", FilterOperator.EQ, "New"))


                    var onFilter = new Filter({
                        filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                        new Filter("Priority", FilterOperator.Contains, Value),
                        new Filter("DateCreated", FilterOperator.Contains, Value),
                        new Filter("Department", FilterOperator.Contains, Value),
                        new Filter("location", FilterOperator.Contains, Value),
                        new Filter("reqType", FilterOperator.Contains, Value),
                        new Filter("reqSubType", FilterOperator.Contains, Value),
                        new Filter("Status", FilterOperator.Contains, Value),
                        ], and: false

                    })
                    filters.push(onFilter)

                }

            } else if (this.keys === "COMPLETED") {
                if (this.key === "New_onBoardig") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Completed"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_Change_of_Conditions") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Completed"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_DEMOBILISE") {
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Completed"))
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))


                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                }

                else {
                    filters.push(new Filter("Status", FilterOperator.EQ, "Completed"))


                    var onFilter = new Filter({
                        filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                        new Filter("Priority", FilterOperator.Contains, Value),
                        new Filter("DateCreated", FilterOperator.Contains, Value),
                        new Filter("Department", FilterOperator.Contains, Value),
                        new Filter("location", FilterOperator.Contains, Value),
                        new Filter("reqType", FilterOperator.Contains, Value),
                        new Filter("reqSubType", FilterOperator.Contains, Value),
                        new Filter("Status", FilterOperator.Contains, Value),
                        ], and: false

                    })
                    filters.push(onFilter)

                }
            } else if (this.keys === "PROGRESS") {
                if (this.key === "New_onBoardig") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "In Progress"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_Change_of_Conditions") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "In Progress"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_DEMOBILISE") {
                    // filters.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    // filters.push(new Filter("Status", FilterOperator.EQ, "In Progress"))
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))


                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else {
                    filters.push(new Filter("Status", FilterOperator.EQ, "In Progress"))


                    var onFilter = new Filter({
                        filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                        new Filter("Priority", FilterOperator.Contains, Value),
                        new Filter("DateCreated", FilterOperator.Contains, Value),
                        new Filter("Department", FilterOperator.Contains, Value),
                        new Filter("location", FilterOperator.Contains, Value),
                        new Filter("reqType", FilterOperator.Contains, Value),
                        new Filter("reqSubType", FilterOperator.Contains, Value),
                        new Filter("Status", FilterOperator.Contains, Value),
                        ], and: false

                    })
                    filters.push(onFilter)

                }
            } else if (this.keys === "REJECT") {
                if (this.key === "New_onBoardig") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Rejected"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_Change_of_Conditions") {
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Rejected"))

                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                    // } else if (this.key === "new_DEMOBILISE") {
                    //     filters.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    //     filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                    //     filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))

                    //     var onFilter = new Filter({
                    //         filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //         new Filter("Priority", FilterOperator.Contains, Value),
                    //         new Filter("DateCreated", FilterOperator.Contains, Value),
                    //         new Filter("Department", FilterOperator.Contains, Value),
                    //         new Filter("location", FilterOperator.Contains, Value),
                    //         new Filter("reqType", FilterOperator.Contains, Value),
                    //         new Filter("reqSubType", FilterOperator.Contains, Value),
                    //         new Filter("Status", FilterOperator.Contains, Value),
                    //         ], and: false

                    //     })
                    //     filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else if (this.key === "new_EXTENDED_END_DATE") {
                    // filters.push(new Filter("Status", FilterOperator.EQ, "Rejected"))
                    // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                    // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))


                    // var onFilter = new Filter({
                    //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    //     new Filter("Priority", FilterOperator.Contains, Value),
                    //     new Filter("DateCreated", FilterOperator.Contains, Value),
                    //     new Filter("Department", FilterOperator.Contains, Value),
                    //     new Filter("location", FilterOperator.Contains, Value),
                    //     new Filter("reqType", FilterOperator.Contains, Value),
                    //     new Filter("reqSubType", FilterOperator.Contains, Value),
                    //     new Filter("Status", FilterOperator.Contains, Value),
                    //     ], and: false

                    // })
                    // filters.push(onFilter)
                    var data = this.filter

                    var onDataFilter = new Filter({
                        filters: data, and: true
                    })
                    var newFilter = new Filter({
                        filters: [onDataFilter, this.onFilter], and: true
                    })

                    filters.push(newFilter)
                } else {
                    filters.push(new Filter("Status", FilterOperator.EQ, "Rejected"))


                    var onFilter = new Filter({
                        filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                        new Filter("Priority", FilterOperator.Contains, Value),
                        new Filter("DateCreated", FilterOperator.Contains, Value),
                        new Filter("Department", FilterOperator.Contains, Value),
                        new Filter("location", FilterOperator.Contains, Value),
                        new Filter("reqType", FilterOperator.Contains, Value),
                        new Filter("reqSubType", FilterOperator.Contains, Value),
                        new Filter("Status", FilterOperator.Contains, Value),

                        ], and: false

                    })
                    filters.push(onFilter)

                }
            } else if (this.key === "New_onBoardig") {
                // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))


                // var onFilter = new Filter({
                //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                //     new Filter("Priority", FilterOperator.Contains, Value),
                //     new Filter("DateCreated", FilterOperator.Contains, Value),
                //     new Filter("Department", FilterOperator.Contains, Value),
                //     new Filter("Status", FilterOperator.Contains, Value),
                //     new Filter("location", FilterOperator.Contains, Value),
                //     new Filter("reqType", FilterOperator.Contains, Value),
                //     new Filter("reqSubType", FilterOperator.Contains, Value),
                //     ], and: false

                // })
                // filters.push(onFilter)
                var data = this.filter

                var onDataFilter = new Filter({
                    filters: data, and: true
                })
                var newFilter = new Filter({
                    filters: [onDataFilter, this.onFilter], and: true
                })

                filters.push(newFilter)
            } else if (this.key === "new_Change_of_Conditions") {
                // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                // filters.push(new Filter("reqSubType", FilterOperator.EQ, ""))

                // var onFilter = new Filter({
                //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                //     new Filter("Priority", FilterOperator.Contains, Value),
                //     new Filter("DateCreated", FilterOperator.Contains, Value),
                //     new Filter("Status", FilterOperator.Contains, Value),
                //     new Filter("Department", FilterOperator.Contains, Value),
                //     new Filter("location", FilterOperator.Contains, Value),
                //     new Filter("reqType", FilterOperator.Contains, Value),
                //     new Filter("reqSubType", FilterOperator.Contains, Value),
                //     ], and: false

                // })
                // filters.push(onFilter)
                var data = this.filter

                var onDataFilter = new Filter({
                    filters: data, and: true
                })
                var newFilter = new Filter({
                    filters: [onDataFilter, this.onFilter], and: true
                })

                filters.push(newFilter)
            } else if (this.key === "new_DEMOBILISE") {

                // filters.push(new Filter("reqType", FilterOperator.EQ, "01"))
                // filters.push(new Filter("reqSubType", FilterOperator.EQ, "AB"))

                // var onFilter = new Filter({
                //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                //     new Filter("Priority", FilterOperator.Contains, Value),
                //     new Filter("DateCreated", FilterOperator.Contains, Value),
                //     new Filter("Department", FilterOperator.Contains, Value),
                //     new Filter("Status", FilterOperator.Contains, Value),
                //     new Filter("location", FilterOperator.Contains, Value),
                //     new Filter("reqType", FilterOperator.Contains, Value),
                //     new Filter("reqSubType", FilterOperator.Contains, Value),
                //     ], and: false

                // })
                // filters.push(onFilter)
                var data = this.filter

                var onDataFilter = new Filter({
                    filters: data, and: true
                })
                var newFilter = new Filter({
                    filters: [onDataFilter, this.onFilter], and: true
                })

                filters.push(newFilter)
            } else if (this.key === "new_EXTENDED_END_DATE") {

                // filters.push(new Filter("reqType", FilterOperator.EQ, "02"))
                // filters.push(new Filter("reqSubType", FilterOperator.EQ, "XY"))


                // var onFilter = new Filter({
                //     filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                //     new Filter("Priority", FilterOperator.Contains, Value),
                //     new Filter("DateCreated", FilterOperator.Contains, Value),
                //     new Filter("Department", FilterOperator.Contains, Value),
                //     new Filter("Status", FilterOperator.Contains, Value),
                //     new Filter("location", FilterOperator.Contains, Value),
                //     new Filter("reqType", FilterOperator.Contains, Value),
                //     new Filter("reqSubType", FilterOperator.Contains, Value),
                //     ], and: false

                // })
                // filters.push(onFilter)
                var data = this.filter

                var onDataFilter = new Filter({
                    filters: data, and: true
                })
                var newFilter = new Filter({
                    filters: [onDataFilter, this.onFilter], and: true
                })

                filters.push(newFilter)
            } else {
                var onFilter = new Filter({
                    filters: [new Filter("sourceName", FilterOperator.Contains, Value),
                    new Filter("Priority", FilterOperator.Contains, Value),
                    new Filter("DateCreated", FilterOperator.Contains, Value),
                    new Filter("Department", FilterOperator.Contains, Value),
                    new Filter("Status", FilterOperator.Contains, Value),
                    new Filter("location", FilterOperator.Contains, Value),
                    new Filter("reqType", FilterOperator.Contains, Value),
                    new Filter("reqSubType", FilterOperator.Contains, Value),
                    ], and: false

                })
                filters.push(onFilter)
            }


            binding.filter(filters);
        },

    });
});