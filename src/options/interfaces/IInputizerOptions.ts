import { InputizerTabOptions, InputizerModifierOptionsActionable, InputizerSequenceOptions, InputizerDebugOptions } from "./index.js";

export interface IInputizerOptions {
    tabOptions?: InputizerTabOptions;
    modifierOptions?: InputizerModifierOptionsActionable[];
    sequences?: InputizerSequenceOptions;
    shouldAutoFocus?: boolean;
    debug?: InputizerDebugOptions;
}