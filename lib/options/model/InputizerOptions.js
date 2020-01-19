import { TabOption } from "./tab/TabOption.js";
import { ModifierOptions } from "./modifiers/ModifierOptions.js";
import { SequenceOptions } from "./sequences/SequenceOptions.js";
import * as _ from "../../utils/index.js";
import { DebugOptions } from "./debug/DebugOptions.js";
import { KeyboardEventModifiers } from "../../keyboardevent/KeyboardEventHandler.js";
import { UndoHandler } from "../../undo/index.js";
export class InputizerOptions {
    constructor(options) {
        var _a, _b, _c;
        this.modifierOptions = [];
        this.shouldAutoFocus = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.shouldAutoFocus, (_b !== null && _b !== void 0 ? _b : false));
        this.tabOptions = new TabOption(options.tabOptions);
        this.debug = new DebugOptions(options.debug);
        this.modifierOptions.push(...new SequenceOptions(options.sequences).getSequences());
        (_c = options.modifierOptions) === null || _c === void 0 ? void 0 : _c.forEach(e => {
            this.modifierOptions.push(new ModifierOptions(e));
        });
        this.modifierOptions.push(new ModifierOptions({
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 'z',
            do: () => {
                UndoHandler.undo();
            }
        }));
        this.modifierOptions.push(new ModifierOptions({
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 'y',
            do: () => {
                UndoHandler.redo();
            }
        }));
        this.validate();
        if (this.debug.enabled) {
            console.group("Inputizer: InputizerOptions");
            console.log("shouldAutoFocus", this.shouldAutoFocus);
            console.group("debugOptions");
            console.table(this.debug);
            console.groupEnd();
            console.group("tabOptions");
            console.table(this.tabOptions);
            console.groupEnd();
            console.group("modifierOptions");
            console.table(this.modifierOptions);
            console.groupEnd();
            console.groupEnd();
        }
    }
    validate() {
        if (!_.isBoolean(this.shouldAutoFocus))
            throw new Error('shouldAutoFocus is expecting a boolean value');
    }
}
