import { InputizerTabOptionsTabStyles } from "../../enums/index.js";
import { KeyboardEventOption } from "../KeyboardEventOption.js";

export interface InputizerTabOptions extends KeyboardEventOption {
    style: InputizerTabOptionsTabStyles,
    indentationNumber?: number;
    readonly identifier?: string;
}