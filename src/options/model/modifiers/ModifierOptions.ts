import { InputizerModifierOptionsActionable } from "../../interfaces/index.js";
import { KeyboardEventModifiers } from "../../../enums.js";
import { AbstractKeyboardEventOption } from "../AbstractKeyboardEventOption.js";
import * as _ from "../../../utils/index.js";

export class ModifierOptions extends AbstractKeyboardEventOption implements InputizerModifierOptionsActionable {
    modifierKeys: KeyboardEventModifiers[];
    key?: string;
    do?(e: KeyboardEvent): void;

    constructor(config?: InputizerModifierOptionsActionable) {
        super();

        if (Array.isArray(config?.modifierKeys)) this.modifierKeys = config?.modifierKeys;
        else this.modifierKeys = [config.modifierKeys];

        this.key = config?.key;
        this.do = config?.do;
        this.validate();
    }

    validate(): void {
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