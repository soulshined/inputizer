import { AbstractKeyboardEventOption } from "../AbstractKeyboardEventOption.js";
import { KeyboardEventHandler } from "../../../keyboardevent/KeyboardEventHandler.js";
import * as E from "../../enums/index.js";
export class TabOption extends AbstractKeyboardEventOption {
    constructor(config) {
        var _a, _b, _c, _d;
        super();
        this.identifier = 'Tab';
        this.style = (_b = (_a = config) === null || _a === void 0 ? void 0 : _a.style, (_b !== null && _b !== void 0 ? _b : E.InputizerTabOptionsTabStyles.SPACES));
        this.indentationNumber = (_d = (_c = config) === null || _c === void 0 ? void 0 : _c.indentationNumber, (_d !== null && _d !== void 0 ? _d : (this.style === E.InputizerTabOptionsTabStyles.SPACES ? 2 : 1)));
        this.validate();
    }
    do(e) {
        if (KeyboardEventHandler.getLineDetails().active.length > 1)
            KeyboardEventHandler.tabManyLines('forwards', this.getText());
        else
            KeyboardEventHandler.insertAtCaret(this.getText());
    }
    doWithModifiers(e) {
        if (e.shiftKey && !e.ctrlKey && !e.altKey)
            KeyboardEventHandler.tabManyLines('backwards', this.getText());
    }
    getText() {
        if (this.style === E.InputizerTabOptionsTabStyles.SPACES)
            return " ".repeat(this.indentationNumber);
        else if (this.style === E.InputizerTabOptionsTabStyles.TAB)
            return "\t".repeat(this.indentationNumber);
        else
            throw new Error('Not Implemented Yet');
    }
    validate() {
        if (typeof this.indentationNumber !== 'number' || this.indentationNumber <= 0)
            throw new Error("inputizer: indentationNumber should be greater than or equal to 0");
        if (!Object.values(E.InputizerTabOptionsTabStyles).includes(this.style))
            throw new Error("invalid tabstyle");
    }
}
