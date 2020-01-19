import * as _ from "../../../utils/index.js";
import { InputizerDebugOptions } from "../../interfaces/debug/InputizerDebugOptions.js";

export class DebugOptions implements InputizerDebugOptions {
    enabled: boolean;
    loadText?: string;
    caretDetailsOnClick: boolean;

    constructor(config?: InputizerDebugOptions) {
        this.enabled = config?.enabled ?? false;
        this.loadText = config?.loadText ?? null;
        this.caretDetailsOnClick = config?.caretDetailsOnClick ?? false;

        this.validate();
    }

    validate(): void {
        if (this.enabled && !_.isBoolean(this.enabled))
            throw new Error('Expecting a boolean value for enabled but got ' + this.enabled);

        if (this.loadText && !_.isString(this.loadText))
            throw new Error('Expecting a string value for loadText but got ' + this.loadText);

        if (this.caretDetailsOnClick && !_.isBoolean(this.caretDetailsOnClick))
            throw new Error('Expecting a boolean value for caretDetailsOnClick but got ' + this.caretDetailsOnClick);

    }
}