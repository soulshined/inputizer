import { KeyboardEventModifiers } from "../../../keyboardevent/KeyboardEventHandler.js";
import { KeyboardEventOption } from "../KeyboardEventOption.js";

export interface InputizerModifierOptions {
    modifierKeys: KeyboardEventModifiers | KeyboardEventModifiers[];
    key?: string;
}

export interface InputizerModifierOptionsActionable extends InputizerModifierOptions, KeyboardEventOption { }