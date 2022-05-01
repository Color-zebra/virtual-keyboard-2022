"use strict"

/* let body = document.createElement('body');
document.body = body; */
const BODY = document.body;
const rusLabel = 'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab й ц у к е н г ш щ з х ъ \\ Del CapsLock ф ы в а п р о л д ж э Enter Shift я ч с м и т ь б ю . \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const engLabel = '\` 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab q w e r t y u i o p { } \\ Del CapsLock a s d f g h j k l : \' Enter Shift z x c v b n m , . / \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const rusShifted = 'Ё ! " № ; % : ? * ( ) - = Backspace Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del CapsLock Ф Ы В А П Р О Л Д Ж Э Enter Shift Я Ч С М И Т Ь Б Ю , \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const engShifted = '~ ! @ # $ % ^ & * ( ) _ + Backspace Tab Q W E R T Y U I O P [ ] \\ Del CapsLock A S D F G H J K L ; " Enter Shift Z X C V B N M < > ? \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
const keys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const letterKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', ];
//const specialKeys = `Backspace Tab Enter Shift Ctrl Alt Control CapsLock`.split(' ');

let text;






function renderPage() {
	renderKeyboard();
	renderTextArea();
	renderKeyLabels();
}

/* =================================================FLAGS================================================== */
let changeLang = new Set();
let lang = localStorage.getItem('lang') || 'eng';

let capsFlag = false;
let shiftFlag = false;
let shiftPressed = false;


/* ===================================RENDER KEYBOARD FUNCTIONS============================================ */
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
	textArea.setAttribute('id', 'text-area');
	textArea.setAttribute('cols', '84');
	textArea.setAttribute('rows', '20');
	textArea.setAttribute('autofocus', 'autofocus');
	BODY.prepend(textAreaWrapper);


	text = document.getElementById('text-area');
	text.onblur = function(e) {
		let selected = [text.selectionEnd, text.selectionStart];
		text.focus();
		text.selectionStart = selected[1];
		text.selectionEnd = selected[0];
	}
}

function createKey(className) {
	let key = document.createElement('div');
	key.setAttribute('class', 'key');
	key.setAttribute('data-key', `${className}`);
	key.setAttribute('id',`${className}`);
	key.classList.add(className);
	key.setAttribute('tabindex', '1');
	return key;
}

function renderKeyLabels() {
	let labels;
	if (capsFlag || shiftFlag) {
		labels = (lang === 'rus') ? rusShifted : engShifted;
	} else {
		labels = (lang === 'rus') ? rusLabel : engLabel;
	}
	let keys = document.getElementsByClassName('key');
	for (let i = 0; i < keys.length; i++) {
		keys[i].textContent = labels[i];
	}
}



/* =====================================KEY PRESS HANDLER============================================================================== */
function changeLanguage() {
	if ((changeLang.has('AltLeft') || changeLang.has('AltRight')) && (changeLang.has('ControlLeft') || changeLang.has('ControlRight'))) {
		lang = (lang === 'rus') ? 'eng' : 'rus';
		localStorage.setItem('lang', lang);
		renderKeyLabels();
	}
}

document.onkeydown = function(e) {
	e.preventDefault();
	if (letterKeys.includes(e.code)){
		let letter = document.getElementById(`${e.code}`).innerText;
		addSymbolToTextArea(letter);
	}
	if (e.code === 'Space') {
		addSpaceToTextArea();
	}
	if (e.code === 'Backspace') {
		removeSymbolFromLeft();
	}
	if (e.code === 'Delete') {
		removeSymbolFromRight();
	}
	if (e.code === 'CapsLock') {
		capsLockToggler();
		document.getElementById(`${e.code}`).classList.toggle('_active');
		return;
	}
	if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && e.repeat === false) {
		shiftToggler();
		shiftPressed = true;
	}
	if (e.code === 'Enter') {
		addSymbolToTextArea("\n");
	}
	if (e.code === 'Tab') {
		addSymbolToTextArea("\t");
	}
	changeLang.add(e.code);
	let key = document.getElementById(`${e.code}`);
	key.classList.add('_active');
	changeLanguage();
}
document.onkeyup = function(e) {
	e.preventDefault();
	if (e.code === 'CapsLock') {
		return;
	}
	if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
		shiftToggler();
		shiftPressed = false;
	}
	changeLang.delete(e.code);
	let key = document.getElementById(`${e.code}`);
	key.classList.remove('_active');
}

/* ===========================================MOUSE CLICK HANDLER========================================= */
document.onclick = function(e) {
	let keyAttr = e.target.getAttribute('data-key');
	if (letterKeys.includes(keyAttr))	{
		addSymbolToTextArea(e.target.innerText);
	}
	if (keyAttr === 'Space') {
		addSpaceToTextArea();
	}
	if (keyAttr === 'Backspace') {
		removeSymbolFromLeft();
	}
	if (keyAttr === 'Delete') {
		removeSymbolFromRight();
	}
	if (keyAttr === 'CapsLock') {
		capsLockToggler();
		document.getElementById(`${keyAttr}`).classList.toggle('_active');
		return;
	}
	if (keyAttr === 'ShiftLeft' || keyAttr === 'ShiftRight') {
		shiftToggler();
		document.getElementById(`${keyAttr}`).classList.toggle('_active');
	}
	if (keyAttr === 'Enter') {
		addSymbolToTextArea("\n");
	}
	if (keyAttr === 'Tab') {
		addSymbolToTextArea("\t");
	}
}



/* ===========================================KEYS FUNCTIONS=============================================== */
function addSymbolToTextArea(letter) {
	let text = document.getElementById('text-area');
	let selected = [text.selectionEnd, text.selectionStart];
	letter = (capsFlag || shiftFlag) ? letter.toUpperCase() : letter.toLowerCase();
	text.value = text.value.slice(0, selected[1]) + `${letter}` + text.value.slice(selected[0], text.value.length);
	text.selectionStart = selected[1]+1;
	text.selectionEnd = selected[0]+1;
	if (shiftFlag && !shiftPressed) {
		document.getElementById(`ShiftLeft`).classList.remove('_active');
		document.getElementById(`ShiftRight`).classList.remove('_active');
		shiftFlag = false;
		renderKeyLabels();
	}
}
function addSpaceToTextArea() {
	let text = document.getElementById('text-area');
	text.value = text.value + ` `;
	
}
function removeSymbolFromLeft() {
	let text = document.getElementById('text-area');
	let selected = [text.selectionEnd, text.selectionStart];
	let isSelected = Boolean(selected[0] - selected[1]);
	if (isSelected) {
		text.value = text.value.slice(0, selected[1]) + text.value.slice(selected[0], text.value.length);
		text.selectionStart = selected[1];
		text.selectionEnd = text.selectionStart;
		return;
	} else {
		if (text.value) {
			text.value = text.value.slice(0, selected[1]-1) + text.value.slice(selected[0], text.value.length);
		}
	}
	text.selectionStart = selected[1]-1;
	text.selectionEnd = text.selectionStart;
}
function removeSymbolFromRight() {
	let text = document.getElementById('text-area');
	let selected = [text.selectionEnd, text.selectionStart];
	let isSelected = Boolean(selected[0] - selected[1]);
	if (isSelected) {
		text.value = text.value.slice(0, selected[1]) + text.value.slice(selected[0], text.value.length);
		text.selectionStart = selected[1];
		text.selectionEnd = text.selectionStart;
		return;
	} else {
		if (text.value) {
			text.value = text.value.slice(0, selected[1]) + text.value.slice(selected[0]+1, text.value.length);
		}
	}
	text.selectionStart = selected[1];
	text.selectionEnd = selected[0];
}

function capsLockToggler() {
	capsFlag = !capsFlag;
	renderKeyLabels();
}

function shiftToggler() {
	shiftFlag = !shiftFlag;
	renderKeyLabels();
}




renderPage();


