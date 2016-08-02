var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'chai', "./InputParser"], function (require, exports, chai_1, InputParser_1) {
    "use strict";
    var TestableInputParser = (function (_super) {
        __extends(TestableInputParser, _super);
        function TestableInputParser() {
            _super.apply(this, arguments);
        }
        TestableInputParser.prototype.testableExtractInputs = function (customInputs) {
            var inputs = customInputs;
            this._extractFieldName(inputs);
            this._values = this._parseInput(inputs["Values"]);
            this._colors = this._parseInput(inputs["Colors"]);
            this._labels = this._parseInput(inputs["Labels"]);
        };
        return TestableInputParser;
    }(InputParser_1.InputParser));
    describe("inputParser", function () {
        var inputParser;
        beforeEach(function () {
            inputParser = new TestableInputParser();
        });
        inputParser.testableExtractInputs({ "FieldName": "Priority",
            "Colors": "red;orange;yellow;blue",
            "Values": "0;1;2;3",
            "Labels": "Critical;High;Medium;Low" });
        it("outputs number when not divisible by 3 or 5", function () {
            chai_1.expect(inputParser.getParsedFieldName()).to.be.equal("Priority");
            chai_1.expect(inputParser.getParsedColors()).to.be.equal(["red", "orange", "yellow", "blue"]);
            chai_1.expect(inputParser.getParsedValues()).to.be.equal(["0", "1", "2", "3"]);
            chai_1.expect(inputParser.getParsedLabels()).to.be.equal(["Critical", "High", "Medium", "Low"]);
            chai_1.expect(inputParser.getErrors()).to.be.equal([]);
        });
        inputParser.testableExtractInputs({ "FieldName": "",
            "Colors": "red;orange;yellow;blue",
            "Values": "0;1;2;3",
            "Labels": "Critical;High;Medium;Low" });
        it("outputs number when not divisible by 3 or 5", function () {
            chai_1.expect(inputParser.getParsedFieldName()).to.be.equal("Priority");
            chai_1.expect(inputParser.getParsedColors()).to.be.equal(["red", "orange", "yellow", "blue"]);
            chai_1.expect(inputParser.getParsedValues()).to.be.equal(["0", "1", "2", "3"]);
            chai_1.expect(inputParser.getParsedLabels()).to.be.equal(["FieldName not found"]);
        });
        inputParser.testableExtractInputs({ "FieldName": "",
            "Colors": ";;;",
            "Values": ";;;",
            "Labels": ";;;" });
        it("Checks if error with empty string", function () {
            chai_1.expect(inputParser.getParsedFieldName()).to.be.equal("");
            chai_1.expect(inputParser.getParsedColors()).to.be.equal(["", "", "", ""]);
            chai_1.expect(inputParser.getParsedValues()).to.be.equal(["", "", ""]);
            chai_1.expect(inputParser.getParsedLabels()).to.be.equal(["", "", "", ""]);
            chai_1.expect(inputParser.getParsedLabels()).to.be.equal(["FieldName not found"]);
        });
    });
});
