const validKeys = ["0", "2", "3", "4", "5", "6", "7", "8", "9", "backspace", "next"];

const keyMap = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
};

let text = '';
let prefix = '';

let lastDist = [];
let db = {};

let keypresses = 0;

function handleKeyPress(keyId) {

    keypresses += 1;

    switch (keyId) {
        case "backspace":
            setText(text.slice(0, -1));

            const filter = Object.values(keyMap).find(list => list.includes(text.slice(-1)));

            if (filter != undefined) {
                lastDist = getDistribution(filter);
            } else {
                lastDist = [];
            }

            console.log(lastDist);
            break;

        case "next":
            let last = text.slice(-1);
            let next = lastDist[(lastDist.indexOf(last) + 1) % lastDist.length];
            setText(text.slice(0, -1) + next);
            break;
        case "0":
            lastDist = [];
            setText(text + " ");
            return;
        default:
            if (keyId in keyMap) {
                lastDist = getDistribution(keyMap[keyId]);

                console.log(lastDist);
                setText(text + lastDist[0]);
            }
            break;
    }
}

function getDistribution(filter) {
    return db[prefix].split("").filter((letter) => filter.includes(letter));
}

function setText(newText) {
    text = newText;
    prefix = text.split(" ").pop()?.slice(-3);
    updateDisplay();
    console.log(`Prefix: ${prefix}`);
}

function updateDisplay() {
    const display = document.getElementById('display');

    console.log(display);

    if (!display) return;

    if (text.length > 0) {
        const normalText = text.slice(0, -1);
        const lastChar = text.slice(-1);
        display.innerHTML = `${normalText}<span class="cursor-letter">${lastChar}</span>`;
    } else {
        display.innerHTML = `<span class="cursor-letter"> </span>`;
    }

    const ks = document.getElementById('ks');
    ks.textContent = keypresses;
    const c = document.getElementById('c');
    c.textContent = text.length;
    const kspc = document.getElementById('kspc');
    kspc.textContent = text.length > 0 ? (keypresses / text.length).toFixed(2) : 0;
}

async function loadDb() {
    try {
        const response = await fetch('en.txt');
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

function handleShortcut(event) {
    switch (event.keyCode) {
        case 49:
            handleKeyPress("1");
            break;
        case 50:
            handleKeyPress("2");
        case 51:
            handleKeyPress("3");
            break;
        case 52:
            handleKeyPress("4");
            break;
        case 53:
            handleKeyPress("5");
            break;
        case 54:
            handleKeyPress("6");
        case 55:
            handleKeyPress("7");
            break;
        case 56:
            handleKeyPress("8");
            break;
        case 57:
            handleKeyPress("9");
            break;
        case 48:
            handleKeyPress("0");
        case 8:
            handleKeyPress("*");
            break;
        case 38:
            handleKeyPress("#");
            break;
        default:
            break;
    }
}

loadDb().then(newDb => {
    db = newDb;
    console.dir(db);
    console.info("Loaded prefixes");
    document.querySelectorAll('.key-button').forEach(button => {
        button.addEventListener('click', () => {
            handleKeyPress(button.id);
        });
    });
    document.addEventListener('keydown', handleShortcut);
})

