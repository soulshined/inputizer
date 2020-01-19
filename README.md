## Inputizer

> An easier way to interact with text areas that use common text editing functionality

### Add keybindings on the fly

In your configuration object add a new modifier mapping:
```js
const options = new InputizerOptions({
    ...
    modifierOptions: [
        {
            modifierKeys: KeyboardEventModifiers.CTRL,
            key: 's',
            do: (e) => {
                console.log('trying to save?');
            }
        }
    ],
    ...
})
```

Note: all modifier mappings will execute `e.preventDefault()`

### Use prebuilt sequence functions and bind them to your preference
    - Adding a line comment
    - Deleting lines
    - Move lines up and down
    - Add indented lines above/below
    - Tab lines forward and backward

### Usage

- Download the 'lib' directory into your project
- Import the 2 main files:
    - `index.js`
    - `options/model/InputizerOptions.js`
- Add the text area for handling by calling the default function:

```js
inputize("myTextArea", options);
```

See `example.js` for example configurations