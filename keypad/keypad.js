class Keypad {
    constructor(name) {
        this.text = "";
        this.name = name;
        this.keypresses = 0;
    }

    static keyMap = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
        '0': [' '],  // space for 0
        '1': ['1'],  // single digit
        '*': ['*'],
        '#': ['#']
    }

    init() {
        console.log("init");
        const label = document.getElementById('name');
        if (label) {
            label.innerText = this.name;
        }
        document.querySelectorAll('.key-button').forEach(button => {
            button.addEventListener('click', () => {
                this.handleKeyPress(button.id);
            });
        });
        document.addEventListener('keydown', this.handleShortcut);
    }

    handleKeyPress(keyId) {
        this.keypresses += 1;
        console.log("Default key press");
    }
    
    handleShortcut(event) {
        switch (event.keyCode) {
            case 49:
                this.handleKeyPress("1");
                break;
            case 50:
                this.handleKeyPress("2");
            case 51:
                this.handleKeyPress("3");
                break;
            case 52:
                this.handleKeyPress("4");
                break;
            case 53:
                this.handleKeyPress("5");
                break;
            case 54:
                this.handleKeyPress("6");
            case 55:
                this.handleKeyPress("7");
                break;
            case 56:
                this.handleKeyPress("8");
                break;
            case 57:
                this.handleKeyPress("9");
                break;
            case 48:
                this.handleKeyPress("0");
            case 8:
                this.handleKeyPress("*");
                break;
            case 38:
                this.handleKeyPress("#");
                break;
            default:
                break;
        }
    }

    setText(newText) {
        this.text = newText;
        this.updateDisplay();
    }

    updateDisplay() {
        const ks = document.getElementById('ks');
        const c = document.getElementById('c');
        const kspc = document.getElementById('kspc');

        if (ks && c && kspc) {
            ks.textContent = this.keypresses;
            c.textContent = this.text.length;
            kspc.textContent = this.text.length > 0 ? (this.keypresses / this.text.length).toFixed(2) : 0;
        }
    }
}