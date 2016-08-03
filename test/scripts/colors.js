define(["require", "exports"], function (require, exports) {
    "use strict";
    var Colors = (function () {
        function Colors() {
        }
        Colors.getColors = function (numberOfValues) {
            var newColors = [];
            var defaultColors = [
                ["red"],
                ["red", "blue"],
                ["red", "yellow", "blue"],
                ["red", "orange", "yellow", "blue"],
                ["red", "orange", "yellow", "blue", "dark blue"],
                ["dark red", "red", "orange", "yellow", "blue", "dark blue"],
                ["dark red", "red", "orange", "yellow", "blue", "dark blue", "purple"]
            ];
            if (numberOfValues > 0 && numberOfValues <= defaultColors.length) {
                newColors = defaultColors[numberOfValues - 1];
                return newColors;
            }
            else if (numberOfValues > defaultColors.length) {
                newColors = defaultColors[defaultColors.length - 1];
                for (var i = defaultColors.length; i < numberOfValues; i++) {
                    newColors.push(defaultColors[defaultColors.length - 1][defaultColors.length - 1]);
                }
                return newColors;
            }
            else {
                throw "Incorrect input and no default colors can be provided";
            }
        };
        return Colors;
    }());
    exports.Colors = Colors;
});
