/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App",
	"./pages/Icon_Tab_Bar_Filter"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();
      	Then.onTheViewPage.iShouldSeeThePageView();

		//Cleanup
		Then.iTeardownMyApp();
	});
});
