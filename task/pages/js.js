"use strict"

const BODY = document.body;
const rusLabel = 'Ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del CapsLock Ф Ы В А П Р О Л Д Ж Э Enter Shift Я Ч С М И Т Ь Б Ю , \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const engLabel = '\` 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab Q W E R T Y U I O P [ ] \\ Del CapsLock A S D F G H J K L ; \' Enter Shift Z X C V B N M , . / \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const keys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const specialKeys = `Backspace Tab Enter Shift Ctrl Alt Control CapsLock`.split(' ');

let lang = 'eng';

function renderKeyboard() {
	let keyboardWrapper = document.createElement('div');
	keyboardWrapper.setAttribute('class', 'keyboard__wrapper');
	BODY.prepend(keyboardWrapper);
	keys.forEach(item => keyboardWrapper.appendChild(createKey(item)))
}

function renderTextArea() {
	let textAreaWrapper = document.createElement('div');
	let textArea = document.createElement('textarea');
	textAreaWrapper.setAttribute('class', 'text-area__wrapper');
	textAreaWrapper.prepend(textArea);
	textArea.setAttribute('class', 'text-area');
	textArea.setAttribute('autofocus', 'autofocus');
	BODY.prepend(textAreaWrapper);
}

function createKey(className) {
	let key = document.createElement('div');
	key.setAttribute('class', 'key');
	//key.setAttribute('data', 'key');
	key.classList.add(className);
	key.setAttribute('tabindex', '1');
	return key;
}

function renderKeyLabels() {
	let labels = (lang === 'rus') ? rusLabel : engLabel;
	let keys = document.getElementsByClassName('key');
	for (let i = 0; i < keys.length; i++) {
		keys[i].textContent = labels[i];
	}
}




renderKeyboard();
renderTextArea();
renderKeyLabels();

document.onkeydown = function(e) {
	if (e.code == 'tab') {
		e.preventDefault();
	}
	let key = document.getElementsByClassName(`${e.code}`);
	for (let i = 0; i < key.length; i++) {
		key[i].classList.add('_active')
	}
}
document.onkeyup = function(e) {
	let key = document.getElementsByClassName(`${e.code}`);
	for (let i = 0; i < key.length; i++) {
		key[i].classList.remove('_active')
	}
}


/* let charCods = [];
document.onkeydown = function(e) {
	console.log(e.code);
	charCods.push(e.code);
}; */

