/*global QUnit*/

sap.ui.define([
	"com/dp/zhrcms/controller/Icon_Tab_Bar_Filter.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Icon_Tab_Bar_Filter Controller");

	QUnit.test("I should test the Icon_Tab_Bar_Filter controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
