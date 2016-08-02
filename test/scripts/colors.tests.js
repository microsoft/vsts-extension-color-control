define(["require", "exports", 'chai', './colors'], function (require, exports, chai_1, colors_1) {
    "use strict";
    describe("Colors", function () {
        var defaultColors = [
            ["red"],
            ["red", "blue"],
            ["red", "yellow", "blue"],
            ["red", "orange", "yellow", "blue"],
            ["red", "orange", "yellow", "blue", "dark blue"],
            ["dark red", "red", "orange", "yellow", "blue", "dark blue"],
            ["dark red", "red", "orange", "yellow", "blue", "dark blue", "purple"]
        ];
        it("outputs color array for 1 value", function () {
            chai_1.expect(colors_1.Colors.getColors(1)).to.be.deep.equal((defaultColors[0]));
        });
        it("outputs color array for 3 values", function () {
            chai_1.expect(colors_1.Colors.getColors(3)).to.be.deep.equal((defaultColors[2]));
        });
        it("outputs color array for 7 values", function () {
            chai_1.expect(colors_1.Colors.getColors(7)).to.be.deep.equal((defaultColors[6]));
        });
        it("outputs color array for 8 values", function () {
            chai_1.expect(colors_1.Colors.getColors(8)).to.be.deep.equal((["dark red", "red", "orange", "yellow", "blue", "dark blue", "purple", "purple"]));
        });
        it("outputs color array for 15 values", function () {
            chai_1.expect(colors_1.Colors.getColors(15)).to.be.deep.equal((["dark red", "red", "orange", "yellow", "blue", "dark blue", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple", "purple"]));
        });
        it("throws exception for invalid input of negative", function () {
            chai_1.expect(function () { return colors_1.Colors.getColors(-1); }).throws(("Incorrect input and no default colors can be provided"));
        });
        it("throws exception for invalid input of 0", function () {
            chai_1.expect(function () { return colors_1.Colors.getColors(0); }).throws(("Incorrect input and no default colors can be provided"));
        });
        it("throws exception for invalid input of null/undefined", function () {
            chai_1.expect(function () { return colors_1.Colors.getColors(null); }).throws(("Incorrect input and no default colors can be provided"));
        });
    });
});
