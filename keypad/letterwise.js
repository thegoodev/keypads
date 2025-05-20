const validKeys = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "backspace", "next"];

class LetterWiseKeypad extends Keypad {
    constructor() {
        super("Letterwise Emulator");
        this.prefix = '';
        this.lastDist = [];
        this.db = {};
    }

    handleKeyPress(keyId) {
        super.handleKeyPress(keyId);
        switch (keyId) {
            case "␈":
                this.setText(this.text.slice(0, -1));

                const filter = Object.values(Keypad.keyMap).find(list => list.includes(this.text.slice(-1)));

                if (filter != undefined) {
                    this.lastDist = this.getDistribution(filter);
                } else {
                    this.lastDist = [];
                }

                console.log(this.lastDist);
                break;

            case "␚":
                let last = this.text.slice(-1);
                let next = this.lastDist[(this.lastDist.indexOf(last) + 1) % this.lastDist.length];
                this.setText(this.text.slice(0, -1) + next);
                break;
            case "0":
                this.lastDist = [];
                this.setText(this.text + " ");
                return;
            default:
                if (keyId in Keypad.keyMap) {
                    this.lastDist = this.getDistribution(Keypad.keyMap[keyId]);

                    console.log(this.lastDist);
                    this.setText(this.text + this.lastDist[0]);
                }
                break;
        }
    }

    getDistribution(filter) {
        return this.db[this.prefix].split("").filter((letter) => filter.includes(letter));
    }

    setText(newText) {
        super.setText(newText);
        this.prefix = this.text.split(" ").pop()?.slice(-3);
        console.log(`Prefix ${this.prefix}`);
    }

    updateDisplay() {
        const display = document.getElementById('display');

        if (!display) return;

        if (this.text.length > 0) {
            const normalText = this.text.slice(0, -1);
            const lastChar = this.text.slice(-1);
            display.innerHTML = `${normalText}<span class="cursor-letter">${lastChar}</span>`;
        } else {
            display.innerHTML = `<span class="cursor-letter"> </span>`;
        }
        super.updateDisplay();
    }

    init() {
        this.loadDb("en").then(newDb => {
            this.db = newDb;
            console.dir(this.db);
            console.info("Loaded prefix database");
            super.init();
        })
    }

    async loadDb(lang) {
        try {
            const response = await fetch("keypad/"+lang + ".txt");
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            const text = await response.text();
            const db = {};
            text.split(/\r?\n/).forEach((line) => {
                const [key, chars] = line.split(",");
                if (key != undefined && chars != undefined) {
                    db[key.toLowerCase()] = chars.toLowerCase();
                }
            });
            return db;
        } catch (err) {
            console.error("Error loading dictionary", err);
            return {};
        }
    }
}