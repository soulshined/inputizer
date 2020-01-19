import { ModifierOptions } from "../modifiers/ModifierOptions.js";
import { KeyboardEventHandler } from "../../../keyboardevent/KeyboardEventHandler.js";
export class SequenceOptions {
    constructor(config) {
        var _a, _b, _c, _d, _e, _f;
        this.options = [];
        if ((_a = config) === null || _a === void 0 ? void 0 : _a.lineComment)
            this.options.push(new ModifierOptions({
                modifierKeys: config.lineComment.modifierKeys,
                key: config.lineComment.key,
                do: (e) => {
                    KeyboardEventHandler.addLineComments(config.lineComment.delimiter);
                }
            }));
        if ((_b = config) === null || _b === void 0 ? void 0 : _b.deleteLine)
            this.options.push(new ModifierOptions({
                modifierKeys: config.deleteLine.modifierKeys,
                key: config.deleteLine.key,
                do: (e) => {
                    KeyboardEventHandler.deleteLines();
                }
            }));
        if ((_c = config) === null || _c === void 0 ? void 0 : _c.moveLineUp)
            this.options.push(new ModifierOptions({
                modifierKeys: config.moveLineUp.modifierKeys,
                key: config.moveLineUp.key,
                do: (e) => {
                    KeyboardEventHandler.moveLineUpDown('up');
                }
            }));
        if ((_d = config) === null || _d === void 0 ? void 0 : _d.moveLineDown)
            this.options.push(new ModifierOptions({
                modifierKeys: config.moveLineDown.modifierKeys,
                key: config.moveLineDown.key,
                do: (e) => {
                    KeyboardEventHandler.moveLineUpDown('down');
                }
            }));
        if ((_e = config) === null || _e === void 0 ? void 0 : _e.newIndentedLineBelow)
            this.options.push(new ModifierOptions({
                modifierKeys: config.newIndentedLineBelow.modifierKeys,
                key: config.newIndentedLineBelow.key,
                do: (e) => {
                    KeyboardEventHandler.addIndentedeLine('down');
                }
            }));
        if ((_f = config) === null || _f === void 0 ? void 0 : _f.newIndentedLineAbove)
            this.options.push(new ModifierOptions({
                modifierKeys: config.newIndentedLineAbove.modifierKeys,
                key: config.newIndentedLineAbove.key,
                do: (e) => {
                    KeyboardEventHandler.addIndentedeLine('up');
                }
            }));
    }
    getSequences() {
        return this.options;
    }
}
