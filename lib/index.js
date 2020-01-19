import { InputizerOptions } from "./options/model/InputizerOptions.js";
import { KeyboardEventHandler } from "./keyboardevent/KeyboardEventHandler.js";
import { UndoHandler } from "./undo/index.js";
export default function inputize(elementId, options) {
    var _a, _b;
    if (document.getElementById(elementId).tagName !== 'TEXTAREA')
        throw new Error("Inputizer currently only supports textareas");
    if (options && !(options instanceof InputizerOptions)) {
        options = new InputizerOptions(options);
    }
    const txta = document.getElementById(elementId);
    KeyboardEventHandler.target = txta;
    if ((_a = options) === null || _a === void 0 ? void 0 : _a.debug.enabled) {
        if (options.debug.loadText) {
            txta.value = options.debug.loadText;
        }
        if (options.debug.caretDetailsOnClick) {
            txta.addEventListener("mouseup", () => {
                console.table(KeyboardEventHandler.getCaretDetails());
            });
        }
    }
    if (((_b = options) === null || _b === void 0 ? void 0 : _b.shouldAutoFocus) === true)
        txta.focus();
    txta.setSelectionRange(0, 0);
    UndoHandler.add();
    txta.onkeydown = (e) => {
        var _a;
        if ((_a = options) === null || _a === void 0 ? void 0 : _a.debug.enabled)
            console.debug(e);
        if (!KeyboardEventHandler.hasModifiers(e) && e.key === 'Enter') {
            const { isSelection, end } = KeyboardEventHandler.getCaretDetails();
            if (!isSelection) {
                const lines = KeyboardEventHandler.getLineDetails().active;
                if (lines[0].lastChIndex + lines[0].begin < end) {
                    UndoHandler.add();
                    KeyboardEventHandler.addIndentedeLine('down');
                    return;
                }
            }
        }
        for (const option in options) {
            if (options.hasOwnProperty(option)) {
                const opts = options[option];
                if (opts.identifier === e.key) {
                    if ((KeyboardEventHandler.hasModifiers(e) && e.shiftKey) || !KeyboardEventHandler.hasModifiers(e)) {
                        if (KeyboardEventHandler.hasModifiers(e))
                            opts.doWithModifiers(e);
                        else
                            opts.do(e);
                        e.preventDefault();
                        break;
                    }
                }
                else if (option === 'modifierOptions') {
                    opts.forEach((element) => {
                        if (KeyboardEventHandler.isDesiredModifierEvent(e, element.modifierKeys, element.key)) {
                            e.preventDefault();
                            element.do(e);
                            return;
                        }
                    });
                }
            }
        }
        if (e.keyCode === 32)
            UndoHandler.add();
    };
}
