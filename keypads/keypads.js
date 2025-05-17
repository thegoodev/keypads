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
        const label = document.getElementById('name');
        if(label){
            label.innerText = this.name;
        }
        document.querySelectorAll('.keybutton').forEach(button => {
            button.addEventListener('click', () => { this.handleKeyPress(button.id) });
        });
    }

    handleKeyPress(keyId) {
        this.keypresses += 1;
    }

    setText(newText) {
        this.text = newText;
        updateDisplay();
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