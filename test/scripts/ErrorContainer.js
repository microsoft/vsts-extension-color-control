define(["require", "exports"], function (require, exports) {
    "use strict";
    var ErrorContainer = (function () {
        function ErrorContainer(parser, model) {
            this._errors = [];
            this._errorsInputParser = [];
            this._errorsModel = [];
            this._parser = parser;
            this._model = model;
        }
        ErrorContainer.prototype.hasErrors = function () {
            this._errorsInputParser = this._parser.getErrors();
            this._errorsModel = this._model.getErrors();
            if (this._errorsInputParser || this._errorsModel)
                return true;
            return false;
        };
        ErrorContainer.prototype.getErrors = function () {
            for (var _i = 0, _a = this._errorsInputParser; _i < _a.length; _i++) {
                var error = _a[_i];
                this._errors.push(error);
            }
            for (var _b = 0, _c = this._errorsModel; _b < _c.length; _b++) {
                var error = _c[_b];
                this._errors.push(error);
            }
            return this._errors;
        };
        ErrorContainer.prototype.push = function (error) {
            this._errors.push(error);
        };
        return ErrorContainer;
    }());
    exports.ErrorContainer = ErrorContainer;
});
