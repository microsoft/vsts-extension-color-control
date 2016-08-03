define(["require", "exports", "./colors"], function (require, exports, colors_1) {
    "use strict";
    var InputParser = (function () {
        function InputParser() {
        }
        InputParser.getFieldName = function (inputs) {
            if (inputs["FieldName"]) {
                return inputs["FieldName"];
            }
            throw ("FieldName not specified.");
        };
        InputParser.getOptions = function (inputs, allowedValues) {
            if (allowedValues && allowedValues.length) {
                var colors = [];
                var inputColors = [];
                var labels = [];
                var inputLabels = [];
                inputColors = InputParser.extractInputs(inputs["Colors"]);
                inputLabels = InputParser.extractInputs(inputs["Labels"]);
                colors = InputParser.getColors(inputColors, allowedValues);
                labels = InputParser.getLabels(inputLabels, allowedValues);
                return InputParser.buildOptions(allowedValues, colors, labels);
            }
            else {
                throw ("Allowed values not specified.");
            }
        };
        InputParser.extractInputs = function (rawInput) {
            if (rawInput) {
                return rawInput.split(";");
            }
            return [];
        };
        InputParser.getColors = function (inputColors, values) {
            if (values.length > inputColors.length && inputColors.length !== 0) {
                throw ("Not enough colors provided in admin XML file.");
            }
            if (inputColors.length === 0) {
                return colors_1.Colors.getColors(values.length);
            }
            else {
                return values.map(function (v, idx) { return inputColors[idx] || ""; });
            }
        };
        InputParser.getLabels = function (inputLabels, values) {
            return values.map(function (v, idx) { return inputLabels[idx] || ""; });
        };
        InputParser.buildOptions = function (values, colors, labels) {
            var options = [];
            var valuesLength = values.length;
            for (var i = 0; i < valuesLength; i++) {
                options.push({
                    value: values[i],
                    color: colors[i],
                    label: labels[i]
                });
            }
            return options;
        };
        return InputParser;
    }());
    exports.InputParser = InputParser;
});
