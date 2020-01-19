import { AbstractKeyboardEventOption } from "../AbstractKeyboardEventOption.js";
import { KeyboardEventHandler } from "../../../keyboardevent/KeyboardEventHandler.js";
import * as I from "../../interfaces/index.js";
import * as E from "../../enums/index.js";

export class TabOption extends AbstractKeyboardEventOption implements I.InputizerTabOptions {
    readonly identifier: string;
    style: E.InputizerTabOptionsTabStyles;
    indentationNumber: number;

    constructor(config: I.InputizerTabOptions) {
        super();
        this.identifier = 'Tab';

        this.style = config?.style ?? E.InputizerTabOptionsTabStyles.SPACES;
        this.indentationNumber = config?.indentationNumber ?? (this.style === E.InputizerTabOptionsTabStyles.SPACES ? 2 : 1);

        this.validate();
    }

    do(e: KeyboardEvent): void {
        if (KeyboardEventHandler.getLineDetails().active.length > 1)
            KeyboardEventHandler.tabManyLines('forwards', this.getText());
        else
            KeyboardEventHandler.insertAtCaret(this.getText());
    }

    doWithModifiers(e: KeyboardEvent): void {
        if (e.shiftKey && !e.ctrlKey && !e.altKey)
            KeyboardEventHandler.tabManyLines('backwards', this.getText());
    }

    private getText() {

        if (this.style === E.InputizerTabOptionsTabStyles.SPACES)
            return " ".repeat(this.indentationNumber);
        else if (this.style === E.InputizerTabOptionsTabStyles.TAB)
            return "\t".repeat(this.indentationNumber);
        else
            throw new Error('Not Implemented Yet');
    }

    validate(): void {
        if (typeof this.indentationNumber !== 'number' || this.indentationNumber <= 0)
            throw new Error("inputizer: indentationNumber should be greater than or equal to 0");

        if (!Object.values(E.InputizerTabOptionsTabStyles).includes(this.style))
            throw new Error("invalid tabstyle");
    }
}