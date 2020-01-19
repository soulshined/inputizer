import { InputizerSequenceOptions, InputizerModifierOptionsActionable } from "../../interfaces/index.js";
import * as _ from "../../../utils/index.js";
import { ModifierOptions } from "../modifiers/ModifierOptions.js";
import { KeyboardEventHandler } from "../../../keyboardevent/KeyboardEventHandler.js";

export class SequenceOptions {
    private options: InputizerModifierOptionsActionable[] = [];

    constructor(config: InputizerSequenceOptions) {
        if (config?.lineComment) this.options.push(new ModifierOptions({
            modifierKeys: config.lineComment.modifierKeys,
            key: config.lineComment.key,
            do: (e) => {
                KeyboardEventHandler.addLineComments(config.lineComment.delimiter);
            }
        }))

        if (config?.deleteLine) this.options.push(new ModifierOptions({
            modifierKeys: config.deleteLine.modifierKeys,
            key: config.deleteLine.key,
            do: (e) => {
                KeyboardEventHandler.deleteLines();
            }
        }))

        if (config?.moveLineUp) this.options.push(new ModifierOptions({
            modifierKeys: config.moveLineUp.modifierKeys,
            key: config.moveLineUp.key,
            do: (e) => {
                KeyboardEventHandler.moveLineUpDown('up');
            }
        }))

        if (config?.moveLineDown) this.options.push(new ModifierOptions({
            modifierKeys: config.moveLineDown.modifierKeys,
            key: config.moveLineDown.key,
            do: (e) => {
                KeyboardEventHandler.moveLineUpDown('down');
            }
        }))

        if (config?.newIndentedLineBelow) this.options.push(new ModifierOptions({
            modifierKeys: config.newIndentedLineBelow.modifierKeys,
            key: config.newIndentedLineBelow.key,
            do: (e) => {
                KeyboardEventHandler.addIndentedeLine('down');
            }
        }))

        if (config?.newIndentedLineAbove) this.options.push(new ModifierOptions({
            modifierKeys: config.newIndentedLineAbove.modifierKeys,
            key: config.newIndentedLineAbove.key,
            do: (e) => {
                KeyboardEventHandler.addIndentedeLine('up');
            }
        }))
    }

    getSequences(): InputizerModifierOptionsActionable[] {
        return this.options;
    }
}