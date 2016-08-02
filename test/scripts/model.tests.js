define(["require", "exports", 'chai', './model'], function (require, exports, chai_1, model_1) {
    "use strict";
    describe("Model", function () {
        var model;
        var options = [
            {
                value: "1",
                color: "Red",
                label: "High"
            },
            {
                value: "2",
                color: "Blue",
                label: "Medium"
            },
            {
                value: "3",
                color: "Green",
                label: "Low"
            }
        ];
        var testOption = {
            value: "4",
            color: "Purple",
            label: "Very Low"
        };
        beforeEach(function () {
            model = new model_1.Model(options, options[0].value);
        });
        it("outputs selected value for 1st option", function () {
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(options[0].value);
        });
        it("outputs selected value for 2nd option", function () {
            model.setSelectedValue(options[1].value);
            chai_1.expect(model.getSelectedValue()).to.be.deep.equal(options[1].value);
        });
        it("outputs selected option for 2nd option", function () {
            model.setSelectedValue(options[1].value);
            chai_1.expect(model.getSelectedOption()).to.be.deep.equal(options[1]);
        });
        it("throws exception for selected value that is not one of values", function () {
            chai_1.expect(function () { return model.setSelectedValue(testOption.value); }).throws("Selected value not within original values");
        });
        it("throws exception for selected value that is null", function () {
            chai_1.expect(function () { return model.setSelectedValue(null); }).throws("Selected value not within original values");
        });
        it("throws exception for selected value that is null", function () {
            chai_1.expect(function () { return model.setSelectedValue(undefined); }).throws("Selected value not within original values");
        });
        it("outputs previous option for 1st selected option: gives first option", function () {
            model.setSelectedValue(options[0].value);
            model.selectPreviousOption();
            chai_1.expect(model.getSelectedOption()).to.be.deep.equal(options[0]);
        });
        it("outputs previous option for last selected option: gives last option", function () {
            model.setSelectedValue(options[2].value);
            model.selectNextOption();
            chai_1.expect(model.getSelectedOption()).to.be.deep.equal(options[2]);
        });
        it("outputs previous option for 2nd selected option", function () {
            model.setSelectedValue(options[1].value);
            model.selectPreviousOption();
            chai_1.expect(model.getSelectedOption()).to.be.deep.equal(options[0]);
        });
        it("outputs next option for 2nd selected option", function () {
            model.setSelectedValue(options[1].value);
            model.selectNextOption();
            chai_1.expect(model.getSelectedOption()).to.be.deep.equal(options[2]);
        });
    });
});
