import inputize from "./lib/index.js";
import { InputizerOptions } from "./lib/options/model/InputizerOptions.js";
import { KeyboardEventModifiers } from "./lib/enums.js";

const options = new InputizerOptions({
    shouldAutoFocus: true,
    debug: {
        enabled: true
    },
    modifierOptions: [
        {
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 's',
            do: () => {
                console.log('trying to save?');
            }
        }
    ],
    sequences: {
        deleteLine: {
            modifierKeys: [KeyboardEventModifiers.CTRL, KeyboardEventModifiers.SHIFT],
            key: 'K'
        },
        lineComment: {
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: '/',
            delimiter: '// '
        },
        moveLineUp: {
            modifierKeys: KeyboardEventModifiers.ALT,
            key: 'ArrowUp'
        },
        moveLineDown: {
            modifierKeys: KeyboardEventModifiers.ALT,
            key: 'ArrowDown'
        },
        newIndentedLineBelow: {
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 'Enter'
        },
        newIndentedLineAbove: {
            modifierKeys: [KeyboardEventModifiers.CTRL, KeyboardEventModifiers.SHIFT],
            key: 'Enter'
        }
    }
});

inputize("myTextArea", options);

