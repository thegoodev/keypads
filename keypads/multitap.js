class MultiTapKeypad extends Keypad {

}

const multiTapMap = {
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
};

let text = '';
let lastKey = null;
let pressCount = 0;
let timeoutId = null;

let keypresses = 0;

function handleKeyPress(keyId) {
  if (!(keyId in multiTapMap)) return;

  keypresses += 1;

  if (keyId == "*") {
    setText(text.slice(0,-1));
    return;
  }

  const chars = multiTapMap[keyId];

  if (keyId === lastKey) {
    // Same key pressed again, cycle to next character
    pressCount = (pressCount + 1) % chars.length;
    // Replace last char with the new one
    setText(text.slice(0,-1) + chars[pressCount]);
  } else {
    // Different key pressed, commit previous and add first char of new key
    lastKey = keyId;
    pressCount = 0;
    setText(text + chars[pressCount]);
  }

  // Reset after 1 second of inactivity on the same key
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    lastKey = null;
    pressCount = 0;
    updateDisplay();
  }, 800);
}

function setText(newText){
  text = newText;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('display');
  if (!display) return;

  if (lastKey !== null && text.length > 0) {
    const normalText = text.slice(0, -1);
    const lastChar = text.slice(-1);
    display.innerHTML = `${normalText}<span class="cursor-letter">${lastChar}</span>`;
  } else {
    display.textContent = text;
  }


  const ks = document.getElementById('ks');
  ks.textContent = keypresses;
  const c = document.getElementById('c');
  c.textContent = text.length;
  const kspc = document.getElementById('kspc');
  kspc.textContent = text.length > 0 ? (keypresses / text.length).toFixed(2) : 0;
}

document.querySelectorAll('.key-button').forEach(button => {
  button.addEventListener('click', () => {
    handleKeyPress(button.id);
  });
});