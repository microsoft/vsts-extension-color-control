define(["require", "exports", "TFS/WorkItemTracking/Services", "./InputParser", "./model", "./view", "./errorView"], function (require, exports, WitService, InputParser_1, model_1, view_1, errorView_1) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            this._fieldName = "";
            this._initialize();
        }
        Controller.prototype._initialize = function () {
            var _this = this;
            this._inputs = VSS.getConfiguration().witInputs;
            this._fieldName = InputParser_1.InputParser.getFieldName(this._inputs);
            WitService.WorkItemFormService.getService().then(function (service) {
                Q.spread([service.getAllowedFieldValues(_this._fieldName), service.getFieldValue(_this._fieldName)], function (allowedValues, currentValue) {
                    var options = InputParser_1.InputParser.getOptions(_this._inputs, allowedValues);
                    _this._model = new model_1.Model(options, currentValue);
                    _this._view = new view_1.colorControl(_this._model, function (val) {
                        _this.update(val);
                    });
                }, _this.handleError);
            }, this.handleError);
        };
        Controller.prototype.handleError = function (error) {
            var errorView = new errorView_1.ErrorView(error);
        };
        Controller.prototype.update = function (value) {
            var _this = this;
            WitService.WorkItemFormService.getService().then(function (service) {
                service.setFieldValue(_this._fieldName, value).then(function () {
                    _this._model.setSelectedValue(value);
                    _this._view.update(value);
                }, _this.handleError);
            }, this.handleError);
        };
        return Controller;
    }());
});
