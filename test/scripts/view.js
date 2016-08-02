define(["require", "exports"], function (require, exports) {
    "use strict";
    var colorRow = (function () {
        function colorRow(allowedValue, color, label) {
            this.allowedValue = allowedValue;
            this.color = color;
            this.label = label;
        }
        colorRow.prototype.create = function () {
            this._row = $("<div> </div>");
            this._row.data("value", this.allowedValue);
            this._row.addClass("row");
            var valueColor = $("<div> </div>");
            valueColor.addClass("valueColor");
            var color = this.color;
            valueColor.css("background-color", this.color);
            this._row.append(valueColor);
            var valueLabel = $("<div> </div>");
            valueLabel.addClass("valueLabel");
            if (!this.label) {
                valueLabel.text(this.allowedValue);
            }
            else {
                valueLabel.text(this.allowedValue + " - " + this.label);
            }
            ;
            this._row.append(valueLabel);
            return this._row;
        };
        colorRow.prototype.select = function () {
            this._row.addClass("selected");
        };
        colorRow.prototype.unselect = function () {
            this._row.removeClass("selected");
        };
        return colorRow;
    }());
    exports.colorRow = colorRow;
    var colorControl = (function () {
        function colorControl(model, onItemClicked) {
            this.model = model;
            this.onItemClicked = onItemClicked;
            this.rows = [];
            this.init();
        }
        colorControl.prototype.init = function () {
            var _this = this;
            var container = $("<div> </div>");
            container.addClass("container");
            var rowSelected = this.model.getSelectedOption();
            var options = this.model.getOptions();
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var option = options_1[_i];
                var row = new colorRow(option.value, option.color, option.label);
                this.rows.push(row);
                container.append(row.create());
                var selected = option.value === rowSelected.value;
                if (selected) {
                    row.select();
                }
                else {
                    row.unselect();
                }
            }
            var callback = function (evt) {
                if (evt.keyCode == 40) {
                    if (rowSelected) {
                        _this.model.selectNextOption();
                        var itemClicked = _this.model.getSelectedOption();
                        if (_this.onItemClicked) {
                            _this.onItemClicked(itemClicked.value);
                        }
                    }
                }
                else if (evt.keyCode == 38) {
                    if (rowSelected) {
                        _this.model.selectPreviousOption();
                        var next = _this.model.getSelectedOption();
                        var itemClicked = next.value;
                        if (_this.onItemClicked) {
                            _this.onItemClicked(itemClicked.value);
                        }
                    }
                }
            };
            container.click(function (evt) {
                var itemClicked = $(evt.target).closest(".row").data("value");
                if (_this.onItemClicked) {
                    _this.onItemClicked(itemClicked);
                }
            });
            container.keydown(function (evt) {
                callback(evt);
            }).keyup(function (evt) {
                callback(evt);
            });
            $('body').empty().append(container);
        };
        colorControl.prototype.update = function (value) {
            for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
                var row = _a[_i];
                if (row.allowedValue == value) {
                    row.select();
                }
                else {
                    row.unselect();
                }
            }
        };
        return colorControl;
    }());
    exports.colorControl = colorControl;
});
