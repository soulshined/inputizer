import * as _ from "../../../utils/index.js";
export class DebugOptions {
    constructor(config) {
        var _a, _b, _c, _d, _e, _f;
        this.enabled = (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.enabled, (_b !== null && _b !== void 0 ? _b : false));
        this.loadText = (_d = (_c = config) === null || _c === void 0 ? void 0 : _c.loadText, (_d !== null && _d !== void 0 ? _d : null));
        this.caretDetailsOnClick = (_f = (_e = config) === null || _e === void 0 ? void 0 : _e.caretDetailsOnClick, (_f !== null && _f !== void 0 ? _f : false));
        this.validate();
    }
    validate() {
        if (this.enabled && !_.isBoolean(this.enabled))
            throw new Error('Expecting a boolean value for enabled but got ' + this.enabled);
        if (this.loadText && !_.isString(this.loadText))
            throw new Error('Expecting a string value for loadText but got ' + this.loadText);
        if (this.caretDetailsOnClick && !_.isBoolean(this.caretDetailsOnClick))
            throw new Error('Expecting a boolean value for caretDetailsOnClick but got ' + this.caretDetailsOnClick);
    }
}
