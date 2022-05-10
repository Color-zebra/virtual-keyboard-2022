import '../sass/style.scss';

window.onload = () => {
  const BODY = document.body;
  const rusLabel = 'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab й ц у к е н г ш щ з х ъ \\ Del CapsLock ф ы в а п р о л д ж э Enter Shift я ч с м и т ь б ю . \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
  const engLabel = '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Tab q w e r t y u i o p { } \\ Del CapsLock a s d f g h j k l : \' Enter Shift z x c v b n m , . / \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
  const rusShifted = 'Ё ! " № ; % : ? * ( ) - = Backspace Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del CapsLock Ф Ы В А П Р О Л Д Ж Э Enter Shift Я Ч С М И Т Ь Б Ю , \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
  const engShifted = '~ ! @ # $ % ^ & * ( ) _ + Backspace Tab Q W E R T Y U I O P [ ] \\ Del CapsLock A S D F G H J K L ; " Enter Shift Z X C V B N M < > ? \u2191 Shift Ctrl Win Alt Space Alt \u2190 \u2193 \u2192 Ctrl'.split(' ');
  const keys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
  const letterKeys = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash'];

  let text;

  const changeLang = new Set();
  let lang = localStorage.getItem('lang') || 'eng';

  let capsFlag = false;
  let shiftFlag = false;
  let shiftPressed = false;

  function createKey(className) {
    const key = document.createElement('div');
    key.setAttribute('class', 'key');
    key.setAttribute('data-key', `${className}`);
    key.setAttribute('id', `${className}`);
    key.classList.add(className);
    key.setAttribute('tabindex', '1');
    return key;
  }

  function renderKeyboard() {
    const keyboardWrapper = document.createElement('div');
    keyboardWrapper.setAttribute('class', 'keyboard__wrapper');
    BODY.prepend(keyboardWrapper);
    keys.forEach((item) => keyboardWrapper.appendChild(createKey(item)));
  }

  function renderTextArea() {
    const textAreaWrapper = document.createElement('div');
    const textArea = document.createElement('textarea');
    textAreaWrapper.setAttribute('class', 'text-area__wrapper');
    textAreaWrapper.prepend(textArea);
    textArea.setAttribute('class', 'text-area');
    textArea.setAttribute('id', 'text-area');
    textArea.setAttribute('cols', '84');
    textArea.setAttribute('rows', '20');
    textArea.setAttribute('autofocus', 'autofocus');
    BODY.prepend(textAreaWrapper);

    text = document.getElementById('text-area');
    text.onblur = () => {
      const selected = [text.selectionEnd, text.selectionStart];
      text.focus();
      [text.selectionEnd, text.selectionStart] = selected;
    };
  }

  function renderKeyLabels() {
    let labels;
    if (capsFlag && shiftFlag) {
      labels = (lang === 'rus') ? rusLabel : engLabel;
    } else if (capsFlag || shiftFlag) {
      labels = (lang === 'rus') ? rusShifted : engShifted;
    } else {
      labels = (lang === 'rus') ? rusLabel : engLabel;
    }
    const allKeys = document.getElementsByClassName('key');
    for (let i = 0; i < allKeys.length; i += 1) {
      allKeys[i].textContent = labels[i];
    }
  }

  function descriptionToggler() {
    const toggleButton = document.getElementById('toggler');
    const description = document.getElementById('description');
    toggleButton.onclick = () => {
      description.classList.toggle('hidden');
      if (description.classList.contains('hidden')) {
        toggleButton.innerText = 'ПОКАЗАТЬ';
      } else {
        toggleButton.innerText = 'СКРЫТЬ';
      }
    };
  }

  function renderDescription() {
    const description = document.createElement('div');
    description.innerHTML = `
    <p>Для переключения языка используй сочетание Shift + Ctrl. При нажатии клавишь мышью, первым следует нажимать Shift</p>
    <p>Клавиатура сделана под Windows</p>
    <ul>В задании использовались следующие фишки ES6:
      <li>const and let</li>
      <li>destructuring assignment</li>
      <li>arrow functions</li>
      <li>Set</li>
    </ul>
    <div id="toggler" class="description__button">Скрыть</div>
    `;
    description.classList.add('description');
    description.setAttribute('id', 'description');
    BODY.prepend(description);
    descriptionToggler();
  }

  function getCurrentTextArray() {
    let value = text.value.split('\n');
    value = value.map((item) => {
      const result = `${item} `;
      return result;
    });
    const result = [];
    for (let i = 0; i < value.length; i += 1) {
      if (value[i].length <= 84) {
        result.push(value[i]);
      } else {
        const string = value[i].slice(0, 87);
        const other = value[i].slice(87);
        result.push(string);
        value[i] = other;
        i -= 1;
      }
    }
    return result;
  }

  function getCaretInfo(textArray) {
    const caretPosition = text.selectionStart + 1;
    let caretPositionString = 0;
    let counter = 0;
    let symbolsInPrevString = 0;
    let symbolsInNxtString = 0;
    for (let i = 0; i < textArray.length; i += 1) {
      counter += textArray[i].length;
      if (counter >= caretPosition) {
        caretPositionString = i + 1;
        break;
      }
    }

    if (caretPosition > textArray[0].length) {
      for (let i = 0; i < caretPositionString - 1; i += 1) {
        symbolsInPrevString += textArray[i].length;
      }
    } else {
      symbolsInPrevString = 'first string';
    }

    if (caretPositionString < textArray.length) {
      for (let i = 0; i < caretPositionString + 1; i += 1) {
        symbolsInNxtString += textArray[i].length;
      }
    } else {
      symbolsInNxtString = 'last string';
    }

    const posInCurrString = (caretPosition > textArray[0].length)
      ? caretPosition - symbolsInPrevString : caretPosition;
    return {
      position: caretPosition,
      curentString: caretPositionString,
      symbolsInPreviousStrings: symbolsInPrevString,
      symbolsInNextString: symbolsInNxtString,
      positionInCurrentString: posInCurrString,
    };
  }
  function caretUp() {
    const textArray = getCurrentTextArray();
    const caretInfo = getCaretInfo(textArray);
    if (caretInfo.symbolsInPreviousStrings === 'first string') {
      return;
    }
    const symbolsInTargetString = textArray[caretInfo.curentString - 2].length;
    if (symbolsInTargetString < caretInfo.positionInCurrentString) {
      text.selectionStart = caretInfo.symbolsInPreviousStrings - 1;
    } else {
      text.selectionStart = caretInfo.symbolsInPreviousStrings - 1
   - symbolsInTargetString + caretInfo.positionInCurrentString;
    }
    text.selectionEnd = text.selectionStart;
  }

  function caretDown() {
    const textArray = getCurrentTextArray();
    const caretInfo = getCaretInfo(textArray);
    if (caretInfo.symbolsInNextString === 'last string') {
      return;
    }
    const symbolsInTargetString = textArray[caretInfo.curentString].length;
    if (symbolsInTargetString < caretInfo.positionInCurrentString) {
      text.selectionStart = caretInfo.symbolsInNextString - 1;
    } else {
      text.selectionStart = caretInfo.symbolsInNextString - 1
   - symbolsInTargetString + caretInfo.positionInCurrentString;
    }
    text.selectionEnd = text.selectionStart;
  }

  function caretLeft() {
    if (text.selectionStart === 0) {
      return;
    }
    text.selectionStart -= 1;
    text.selectionEnd = text.selectionStart;
  }

  function caretRight() {
    if (text.value.length === text.selectionStart) {
      return;
    }
    text.selectionStart += 1;
    text.selectionEnd = text.selectionStart;
  }

  function addSymbolToTextArea(symbol) {
    const selected = [text.selectionEnd, text.selectionStart];
    let letter;
    if (capsFlag && shiftFlag) {
      letter = symbol.toLowerCase();
    } else if (capsFlag || shiftFlag) {
      letter = symbol.toUpperCase();
    } else {
      letter = symbol.toLowerCase();
    }
    text.value = `${text.value.slice(0, selected[1])}${letter}${text.value.slice(selected[0], text.value.length)}`;
    text.selectionStart = selected[1] + 1;
    text.selectionEnd = selected[0] + 1;
    if (shiftFlag && !shiftPressed) {
      document.getElementById('ShiftLeft').classList.remove('_active');
      document.getElementById('ShiftRight').classList.remove('_active');
      shiftFlag = false;
      renderKeyLabels();
    }
  }
  function addSpaceToTextArea() {
    const selected = [text.selectionEnd, text.selectionStart];
    text.value = `${text.value.slice(0, selected[1])}${' '}${text.value.slice(selected[0], text.value.length)}`;
    text.selectionStart = selected[1] + 1;
    text.selectionEnd = selected[0] + 1;
  }
  function removeSymbolFromLeft() {
    const selected = [text.selectionEnd, text.selectionStart];
    const isSelected = Boolean(selected[0] - selected[1]);
    if (isSelected) {
      text.value = text.value.slice(0, selected[1])
      + text.value.slice(selected[0], text.value.length);
      [, text.selectionStart] = selected;
      text.selectionEnd = text.selectionStart;
      return;
    }
    if (text.value) {
      text.value = text.value.slice(0, selected[1] - 1)
      + text.value.slice(selected[0], text.value.length);
    }

    text.selectionStart = selected[1] - 1;
    text.selectionEnd = text.selectionStart;
  }
  function removeSymbolFromRight() {
    const selected = [text.selectionEnd, text.selectionStart];
    const isSelected = Boolean(selected[0] - selected[1]);
    if (isSelected) {
      text.value = text.value.slice(0, selected[1])
      + text.value.slice(selected[0], text.value.length);
      [, text.selectionStart] = selected;
      text.selectionEnd = text.selectionStart;
      return;
    } if (text.value) {
      text.value = text.value.slice(0, selected[1])
      + text.value.slice(selected[0] + 1, text.value.length);
    }
    [text.selectionEnd, text.selectionStart] = selected;
  }

  function capsLockToggler() {
    capsFlag = !capsFlag;
    renderKeyLabels();
  }

  function shiftToggler() {
    shiftFlag = !shiftFlag;
    renderKeyLabels();
  }

  function changeLanguage(e) {
    if ((changeLang.has('ShiftLeft') || changeLang.has('ShiftRight')) && (changeLang.has('ControlLeft') || changeLang.has('ControlRight')) && e.repeat === false) {
      lang = (lang === 'rus') ? 'eng' : 'rus';
      localStorage.setItem('lang', lang);
      renderKeyLabels();
    }
  }

  document.onkeydown = (e) => {
    e.preventDefault();
    if (letterKeys.includes(e.code)) {
      const letter = document.getElementById(`${e.code}`).innerText;
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
    if (e.code === 'CapsLock' && e.repeat === false) {
      capsLockToggler(e);
      document.getElementById(`${e.code}`).classList.toggle('_active');
      return;
    }
    if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && e.repeat === false) {
      shiftToggler();
      shiftPressed = true;
    }
    if (e.code === 'Enter') {
      addSymbolToTextArea('\n');
    }
    if (e.code === 'Tab') {
      addSymbolToTextArea('\t');
    }
    if (e.code === 'ArrowUp') {
      caretUp();
    }
    if (e.code === 'ArrowDown') {
      caretDown();
    }
    if (e.code === 'ArrowLeft') {
      caretLeft();
    }
    if (e.code === 'ArrowRight') {
      caretRight();
    }
    changeLang.add(e.code);
    const key = document.getElementById(`${e.code}`);
    if (!key) {
      return;
    }
    key.classList.add('_active');
    changeLanguage(e);
  };
  document.onkeyup = (e) => {
    e.preventDefault();
    if (e.code === 'CapsLock') {
      return;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      shiftToggler();
      shiftPressed = false;
    }
    changeLang.delete(e.code);
    const key = document.getElementById(`${e.code}`);
    if (!key) {
      return;
    }
    key.classList.remove('_active');
  };

  document.onclick = (e) => {
    const keyAttr = e.target.getAttribute('data-key');
    if (letterKeys.includes(keyAttr)) {
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
      capsLockToggler(e);
      document.getElementById(`${keyAttr}`).classList.toggle('_active');
      return;
    }
    if (keyAttr === 'ShiftLeft' || keyAttr === 'ShiftRight') {
      shiftToggler();
      document.getElementById(`${keyAttr}`).classList.toggle('_active');
    }
    if (keyAttr === 'Enter') {
      addSymbolToTextArea('\n');
    }
    if (keyAttr === 'Tab') {
      addSymbolToTextArea('\t');
    }
    if (keyAttr === 'ArrowUp') {
      caretUp();
    }
    if (keyAttr === 'ArrowDown') {
      caretDown();
    }
    if (keyAttr === 'ArrowLeft') {
      caretLeft();
    }
    if (keyAttr === 'ArrowRight') {
      caretRight();
    }
    if (keyAttr === 'ControlLeft' || keyAttr === 'ControlRight') {
      if (shiftFlag) {
        lang = (lang === 'rus') ? 'eng' : 'rus';
        localStorage.setItem('lang', lang);
        document.getElementById('ShiftLeft').classList.remove('_active');
        document.getElementById('ShiftRight').classList.remove('_active');
        shiftFlag = false;
        renderKeyLabels();
      }
    }
  };

  function renderPage() {
    renderKeyboard();
    renderTextArea();
    renderKeyLabels();
    renderDescription();
  }

  renderPage();
};
