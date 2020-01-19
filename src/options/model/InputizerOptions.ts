import { InputizerTabOptions, InputizerModifierOptionsActionable, IInputizerOptions } from "../interfaces/index.js";
import { TabOption } from "./tab/TabOption.js";
import { ModifierOptions } from "./modifiers/ModifierOptions.js";
import { SequenceOptions } from "./sequences/SequenceOptions.js";
import * as _ from "../../utils/index.js";
import { InputizerDebugOptions } from "../interfaces/debug/InputizerDebugOptions.js";
import { DebugOptions } from "./debug/DebugOptions.js";
import { KeyboardEventModifiers } from "../../keyboardevent/KeyboardEventHandler.js";
import { UndoHandler } from "../../undo/index.js";

export class InputizerOptions implements IInputizerOptions {
    tabOptions?: InputizerTabOptions;
    modifierOptions?: InputizerModifierOptionsActionable[] = [];
    shouldAutoFocus?: boolean;
    debug?: InputizerDebugOptions;

    constructor(options: IInputizerOptions) {
        this.shouldAutoFocus = options?.shouldAutoFocus ?? false;

        this.tabOptions = new TabOption(options.tabOptions);
        this.debug = new DebugOptions(options.debug);

        this.modifierOptions.push(...new SequenceOptions(options.sequences).getSequences());

        options.modifierOptions?.forEach(e => {
            this.modifierOptions.push(new ModifierOptions(e));
        });

        this.modifierOptions.push(new ModifierOptions({
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 'z',
            do: () => {
                UndoHandler.undo();
            }
        }))

        this.modifierOptions.push(new ModifierOptions({
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 'y',
            do: () => {
                UndoHandler.redo();
            }
        }))

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

    private validate() {
        if (!_.isBoolean(this.shouldAutoFocus))
            throw new Error('shouldAutoFocus is expecting a boolean value');
    }
}