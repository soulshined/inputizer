
export interface KeyboardEventOption {
    do?(e: KeyboardEvent): void;
    doWithModifiers?(e: KeyboardEvent): void;
}