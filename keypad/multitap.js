class MultiTapKeypad extends Keypad {
  constructor() {
    super("MultiTap Emulator");
    this.lastKey = null;
    this.pressCount = 0;
    this.timeoutId = null;
  }

  handleKeyPress(keyId) {  
    if (!(keyId in Keypad.keyMap)) return;

    if (keyId == "*") {
      this.setText(this.text.slice(0, -1));
      return;
    }

    const chars = Keypad.keyMap[keyId];

    if (keyId === this.lastKey) {
      // Same key pressed again, cycle to next character
      this.pressCount = (this.pressCount + 1) % chars.length;
      // Replace last char with the new one
      this.setText(this.text.slice(0, -1) + chars[this.pressCount]);
    } else {
      // Different key pressed, commit previous and add first char of new key
      this.lastKey = keyId;
      this.pressCount = 0;
      this.setText(this.text + chars[this.pressCount]);
    }

    // Reset after 1 second of inactivity on the same key
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.lastKey = null;
      this.pressCount = 0;
      this.updateDisplay();
    }, 800);
    
    super.handleKeyPress(keyId);
  }

  updateDisplay() {
    super.updateDisplay();
    const display = document.getElementById('display');
    if (!display) return;

    if (this.lastKey !== null && this.text.length > 0) {
      const normalText = this.text.slice(0, -1);
      const lastChar = this.text.slice(-1);
      display.innerHTML = `${normalText}<span class="cursor-letter">${lastChar}</span>`;
    } else {
      display.textContent = this.text;
    }
  }
}