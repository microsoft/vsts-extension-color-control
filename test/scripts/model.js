define(["require", "exports"], function (require, exports) {
    "use strict";
    var Model = (function () {
        function Model(options, initialValue) {
            this._options = [];
            this._options = options;
            this._selectedValue = initialValue;
        }
        Model.prototype.setSelectedValue = function (value) {
            for (var _i = 0, _a = this._options; _i < _a.length; _i++) {
                var option = _a[_i];
                if (option.value === value) {
                    this._selectedValue = value;
                    this._selectedOption = option;
                    break;
                }
            }
            if (this._selectedValue !== value) {
                throw "Selected value not within original values";
            }
        };
        Model.prototype.selectPreviousOption = function () {
            var index = this._options.indexOf(this._selectedOption);
            if (index > 0) {
                this.setSelectedValue(this._options[index - 1].value);
            }
        };
        Model.prototype.selectNextOption = function () {
            var index = this._options.indexOf(this._selectedOption);
            if (index < (this._options.length - 1)) {
                this.setSelectedValue(this._options[index + 1].value);
            }
        };
        Model.prototype.getSelectedValue = function () {
            return this._selectedValue;
        };
        Model.prototype.getSelectedOption = function () {
            return this._selectedOption;
        };
        Model.prototype.getOptions = function () {
            return this._options;
        };
        return Model;
    }());
    exports.Model = Model;
});
