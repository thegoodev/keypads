const urlParams = new URLSearchParams(window.location.search);
const emulator = urlParams.get('emulator');

console.log("Requested emulator:", emulator);

let keypad = undefined;

switch (emulator) {
    case "multitap":
        keypad = new MultiTapKeypad();
        break;
    case "letterwise":
        keypad = new LetterWiseKeypad();
        break;
    default:
        break;
}

if (keypad) {
    console.log("Success");
    keypad.init();
}