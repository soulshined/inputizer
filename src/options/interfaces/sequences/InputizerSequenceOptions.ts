import { InputizerModifierOptions } from "../../interfaces/index.js";

export interface InputizerSequenceOptions {
    lineComment?: InputizerModifierOptions & {
        delimiter: string
    };
    deleteLine?: InputizerModifierOptions;
    moveLineUp?: InputizerModifierOptions;
    moveLineDown?: InputizerModifierOptions;
    newIndentedLineBelow?: InputizerModifierOptions;
    newIndentedLineAbove?: InputizerModifierOptions;
}

