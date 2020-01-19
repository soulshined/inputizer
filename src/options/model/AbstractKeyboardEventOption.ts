import { KeyboardEventOption } from "../interfaces/KeyboardEventOption.js";

export abstract class AbstractKeyboardEventOption implements KeyboardEventOption {
    abstract validate(): void;
    abstract do?(e: KeyboardEvent): void;
}