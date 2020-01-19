import { KeyboardEventModifiers } from "../../../enums.js";
import { AbstractKeyboardEventOption } from "../AbstractKeyboardEventOption.js";
import * as _ from "../../../utils/index.js";
export class ModifierOptions extends AbstractKeyboardEventOption {
    constructor(config) {
        var _a, _b, _c, _d;
        super();
        if (Array.isArray((_a = config) === null || _a === void 0 ? void 0 : _a.modifierKeys))
            this.modifierKeys = (_b = config) === null || _b === void 0 ? void 0 : _b.modifierKeys;
        else
            this.modifierKeys = [config.modifierKeys];
        this.key = (_c = config) === null || _c === void 0 ? void 0 : _c.key;
        this.do = (_d = config) === null || _d === void 0 ? void 0 : _d.do;
        this.validate();
    }
    validate() {
        this.modifierKeys.forEach(modifier => {
            if (!_.isEnumValue(modifier, KeyboardEventModifiers))
                throw new Error(`Invalid enum type '${modifier}' for ModifierKeys`);
        });
        if (this.key && !_.isString(this.key))
            throw new Error('Expecting a string value for key but got ' + this.key);
        if (this.do && !_.isFunction(this.do))
            throw new Error('Expecting a function value for do but got ' + this.do);
    }
}
