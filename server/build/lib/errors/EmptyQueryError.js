"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ts_custom_error_1 = require("ts-custom-error");
var EmptyQueryError = /** @class */ (function (_super) {
    __extends(EmptyQueryError, _super);
    function EmptyQueryError(name, providedData) {
        return _super.call(this, name + " with provided " + providedData + " was not found") || this;
    }
    return EmptyQueryError;
}(ts_custom_error_1.CustomError));
exports.default = EmptyQueryError;
