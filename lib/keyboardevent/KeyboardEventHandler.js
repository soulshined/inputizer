import { UndoHandler } from "../undo/index.js";
export var KeyboardEventModifiers;
(function (KeyboardEventModifiers) {
    KeyboardEventModifiers[KeyboardEventModifiers["NONE"] = 1] = "NONE";
    KeyboardEventModifiers[KeyboardEventModifiers["ALT"] = 2] = "ALT";
    KeyboardEventModifiers[KeyboardEventModifiers["CTRL"] = 4] = "CTRL";
    KeyboardEventModifiers[KeyboardEventModifiers["SHIFT"] = 8] = "SHIFT";
})(KeyboardEventModifiers || (KeyboardEventModifiers = {}));
export class KeyboardEventHandler {
    static insertAtCaret(text) {
        UndoHandler.add();
        const { start, end, valueAfter, valueBefore } = this.getCaretDetails();
        let pos = text.length;
        pos += start === end ? end : start;
        this.target.value = valueBefore + text + valueAfter;
        setTimeout(() => {
            this.target.setSelectionRange(pos, pos, "forward");
        }, 1);
    }
    static moveLineUpDown(direction) {
        const { start, end } = this.getCaretDetails();
        const { raw, active } = this.getLineDetails();
        const newLines = [...raw];
        newLines.splice(active[0].line, active.length);
        let pos;
        if (direction === 'up') {
            if (active[0].line === 0)
                return;
            newLines.splice(active[0].line - 1, 0, ...[...active].map(m => m.value));
            pos = start - raw[active[0].line - 1].length - 1;
        }
        else if (direction === 'down') {
            const lastLine = active[active.length - 1];
            if (lastLine.line == raw.length - 1)
                return;
            newLines.splice(active[0].line + 1, 0, ...[...active].map(m => m.value));
            pos = start + raw[lastLine.line + 1].length + 1;
        }
        this.target.value = newLines.join("\n");
        this.target.setSelectionRange(pos, pos + end - start);
    }
    static tabManyLines(tabDirection, delimiter) {
        UndoHandler.add();
        const { raw, active } = this.getLineDetails();
        const { start, end, direction } = this.getCaretDetails();
        const range = [start, end];
        if (tabDirection === 'forwards') {
            active.map(m => {
                m.value = delimiter + m.value;
                raw[m.line] = m.value;
            });
            range[0] += delimiter.length;
            range[1] += delimiter.length * active.length;
        }
        else if (tabDirection === 'backwards') {
            let changed = 0;
            active.map(m => {
                if (m.value.startsWith(delimiter)) {
                    changed++;
                    raw[m.line] = m.value.substring(delimiter.length);
                }
            });
            if (active[0].firstChIndex > 0) {
                const lastLine = active[active.length - 1];
                range[0] = Math.max(active[0].begin, start - delimiter.length);
                range[1] = Math.min(end - (delimiter.length * changed), lastLine.end);
            }
        }
        this.target.value = raw.join("\n");
        this.target.setSelectionRange(range[0], range[1], direction);
    }
    static deleteLines() {
        UndoHandler.add();
        const { raw, active, all } = this.getLineDetails();
        raw.splice(active[0].line, active.length);
        this.target.value = raw.join("\n");
        const prevLine = Math.max(active[0].line - 1, 0);
        const pos = all[prevLine].begin + all[prevLine].lastChIndex + 1;
        this.target.setSelectionRange(pos, pos);
    }
    static addLineComments(text) {
        UndoHandler.add();
        const { start, end } = this.getCaretDetails();
        let lines = this.getLineDetails().active;
        if (lines.length === 0)
            return;
        if (lines.length === 1 && lines[0].value.trim() === "") {
            this.insertAtCaret(text);
            return;
        }
        lines = lines.filter(f => f.value.trim() !== '');
        lines.forEach(line => {
            if (line.value.match(`^\\s*${text}`)) {
                this.target.value = this.target.value.replace(`${text}`, "");
                this.target.setSelectionRange(start - text.length, end - (text.length * lines.length));
            }
            else {
                this.target.value = this.target.value.replace(line.value, line.value.substring(0, line.firstChIndex) + text + line.value.substring(line.firstChIndex));
                this.target.setSelectionRange(start + text.length, end + (text.length * lines.length));
            }
        });
    }
    static addIndentedeLine(direction) {
        UndoHandler.add();
        const { active, raw, all } = this.getLineDetails();
        if (direction === 'down') {
            const line = active[active.length - 1];
            raw.splice(line.line, 1, line.value, line.prefix);
            this.target.value = raw.join("\n");
            const pos = line.end + line.prefix.length + 1;
            setTimeout(() => {
                this.target.setSelectionRange(pos, pos);
            }, 1);
        }
        else if (direction === 'up') {
            const line = active[0];
            raw.splice(line.line, 1, line.prefix, line.value);
            this.target.value = raw.join("\n");
            setTimeout(() => {
                const pos = all[active[0].line].begin + line.prefix.length;
                this.target.setSelectionRange(pos, pos);
            }, 1);
        }
    }
    static hasModifiers(e) {
        return e.altKey || e.ctrlKey || e.shiftKey;
    }
    static isDesiredModifierEvent(e, modifiers, key) {
        if (modifiers.includes(KeyboardEventModifiers.NONE))
            return !this.hasModifiers(e);
        const includes = (...args) => {
            if (args.length !== modifiers.length)
                return false;
            return args.filter(f => modifiers.includes(f)).length === modifiers.length;
        };
        let isModifierValid = false;
        if (includes(KeyboardEventModifiers.CTRL, KeyboardEventModifiers.ALT, KeyboardEventModifiers.SHIFT)) {
            isModifierValid = e.altKey && e.shiftKey && e.ctrlKey;
        }
        else if (includes(KeyboardEventModifiers.ALT, KeyboardEventModifiers.CTRL)) {
            isModifierValid = e.altKey && e.ctrlKey;
        }
        else if (includes(KeyboardEventModifiers.ALT, KeyboardEventModifiers.SHIFT)) {
            isModifierValid = e.altKey && e.shiftKey;
        }
        else if (includes(KeyboardEventModifiers.CTRL, KeyboardEventModifiers.SHIFT)) {
            isModifierValid = e.ctrlKey && e.shiftKey;
        }
        else if (includes(KeyboardEventModifiers.SHIFT)) {
            isModifierValid = e.shiftKey && !e.altKey && !e.ctrlKey;
        }
        else if (includes(KeyboardEventModifiers.CTRL)) {
            isModifierValid = e.ctrlKey && !e.shiftKey && !e.altKey;
        }
        else if (includes(KeyboardEventModifiers.ALT)) {
            isModifierValid = e.altKey && !e.shiftKey && !e.ctrlKey;
        }
        else {
            return false;
        }
        return isModifierValid && (key ? e.key === key : true);
    }
    static getLineDetails() {
        const { start, end } = this.getCaretDetails();
        let length = 0;
        const allLines = this.target.value.split("\n");
        const mapped = allLines
            .map((m, i) => {
            var _a, _b, _c, _d, _e, _f;
            const firstChIndex = m.match(/\S/);
            const line = {
                line: i,
                value: m,
                length: m.length,
                begin: length + i,
                end: length + i + m.length,
                firstChIndex: (_b = (_a = firstChIndex) === null || _a === void 0 ? void 0 : _a.index, (_b !== null && _b !== void 0 ? _b : 0)),
                prefix: (_d = (_c = firstChIndex) === null || _c === void 0 ? void 0 : _c.input.substring(0, firstChIndex.index), (_d !== null && _d !== void 0 ? _d : ((m !== null && m !== void 0 ? m : '')))),
                lastChIndex: (_f = (_e = m.match(/\S\s*$/)) === null || _e === void 0 ? void 0 : _e.index, (_f !== null && _f !== void 0 ? _f : 0))
            };
            length += m.length;
            return line;
        });
        return {
            raw: allLines,
            all: mapped,
            active: mapped.filter(f => start <= f.end)
                .filter(f => end >= f.end || end <= f.end && end >= f.begin)
        };
    }
    static getCaretDetails() {
        const { selectionStart, selectionEnd, selectionDirection } = this.target;
        return {
            direction: selectionDirection,
            start: selectionStart,
            end: selectionEnd,
            isSelection: selectionStart !== selectionEnd,
            valueBefore: this.target.value.substring(0, selectionStart),
            valueAfter: this.target.value.substring(selectionEnd)
        };
    }
}
