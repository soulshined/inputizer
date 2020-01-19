import { KeyboardEventHandler } from "../keyboardevent/KeyboardEventHandler.js";
const MAX_ITEMS = 25;
export class UndoHandler {
    static add() {
        const caretDetails = KeyboardEventHandler.getCaretDetails();
        const value = KeyboardEventHandler.target.value;
        UndoHandler.stack.unshift({
            caretDetails,
            value
        });
        UndoHandler.stack.splice(MAX_ITEMS);
    }
    static undo() {
        if (UndoHandler.stack[0] !== undefined) {
            const { caretDetails, value } = UndoHandler.stack[0];
            KeyboardEventHandler.target.value = value;
            KeyboardEventHandler.target.selectionStart = caretDetails.start;
            KeyboardEventHandler.target.selectionEnd = caretDetails.end;
            UndoHandler.popped.unshift(UndoHandler.stack[0]);
            UndoHandler.stack.shift();
        }
    }
    static redo() {
        if (UndoHandler.popped[1] !== undefined) {
            const { caretDetails, value } = UndoHandler.popped[1];
            KeyboardEventHandler.target.value = value;
            KeyboardEventHandler.target.selectionStart = caretDetails.start;
            KeyboardEventHandler.target.selectionEnd = caretDetails.end;
            UndoHandler.stack.unshift(UndoHandler.popped[0]);
            UndoHandler.popped.shift();
        }
    }
}
UndoHandler.stack = [];
UndoHandler.popped = [];
