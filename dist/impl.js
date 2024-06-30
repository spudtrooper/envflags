"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBoolean = exports.newNumber = exports.newString = void 0;
var globalDebug = ["1", "true"].includes(process.env.ENV_FLAG_DEBUG || "");
var Flag = /** @class */ (function () {
    function Flag(_a) {
        var name = _a.name, defaultValue = _a.defaultValue, _b = _a.debug, debug = _b === void 0 ? false : _b;
        this.name = name;
        this.defaultValue = defaultValue;
        this.debug = debug;
        this.cast(String(defaultValue));
        if (debug) {
            console.log("ENV_FLAG[".concat(name, "] create, defaultValue=").concat(defaultValue, " value=").concat(this._value()));
        }
    }
    Flag.prototype.cast = function (s) {
        throw new Error("cast ot implemented");
    };
    Object.defineProperty(Flag.prototype, "value", {
        get: function () {
            return this._value();
        },
        enumerable: false,
        configurable: true
    });
    Flag.prototype._value = function () {
        var s = process.env[this.name];
        if (s !== undefined) {
            var res_1 = this.cast(s);
            if (this.debug) {
                console.log("ENV_FLAG[".concat(this.name, "] value (from env) => ").concat(res_1));
            }
            return res_1;
        }
        var res = this.defaultValue;
        if (this.debug) {
            console.log("ENV_FLAG[".concat(this.name, "] value (from default) => ").concat(res));
        }
        return res;
    };
    return Flag;
}());
var StringFlag = /** @class */ (function (_super) {
    __extends(StringFlag, _super);
    function StringFlag(props) {
        return _super.call(this, {
            name: props.name,
            defaultValue: props.defaultValue !== undefined ? props.defaultValue : "",
            debug: !!(props.debug || globalDebug),
        }) || this;
    }
    StringFlag.prototype.cast = function (s) {
        return s;
    };
    return StringFlag;
}(Flag));
var BooleanFlag = /** @class */ (function (_super) {
    __extends(BooleanFlag, _super);
    function BooleanFlag(props) {
        return _super.call(this, {
            name: props.name,
            defaultValue: props.defaultValue !== undefined ? props.defaultValue : false,
            debug: !!(props.debug || globalDebug),
        }) || this;
    }
    BooleanFlag.prototype.cast = function (s) {
        return ["1", "true"].includes(s);
    };
    return BooleanFlag;
}(Flag));
var NumberFlag = /** @class */ (function (_super) {
    __extends(NumberFlag, _super);
    function NumberFlag(props) {
        return _super.call(this, {
            name: props.name,
            defaultValue: props.defaultValue !== undefined ? props.defaultValue : 0,
            debug: !!(props.debug || globalDebug),
        }) || this;
    }
    NumberFlag.prototype.cast = function (s) {
        return Number(s);
    };
    return NumberFlag;
}(Flag));
var newString = function (props) { return new StringFlag(props); };
exports.newString = newString;
var newBoolean = function (props) { return new BooleanFlag(props); };
exports.newBoolean = newBoolean;
var newNumber = function (props) { return new NumberFlag(props); };
exports.newNumber = newNumber;
