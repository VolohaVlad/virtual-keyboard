import getKeyRows from './data';

let element = null;
let textarea = null;

const state = {
  isShiftLeftPressed: false,
  isShiftRightPressed: false,
  isCapsLockPressed: false,
  case: 'lowerCase',
  lang: 'en',
};

let current = {
  element: null,
  code: null,
  event: null,
  char: null,
};

let previous = {
  element: null,
  code: null,
  event: null,
  char: null,
};

const specials = [
  'Backspace',
  'Tab',
  'Enter',
  'CapsLock',
  'ShiftLeft',
  'ShiftRight',
  'AltLeft',
  'AltRight',
  'ControlLeft',
  'ControlRight',
  'MetaLeft',
  'Delete',
];

function createKey(key) {
  const div = document.createElement('div');
  div.classList.add('keyboard__key', 'key', ...key.classes);

  const ruSpan = document.createElement('span');
  ruSpan.classList.add('ru', 'hidden');
  const lowerCaseRu = document.createElement('span');
  lowerCaseRu.classList.add('lowerCase', 'hidden');
  lowerCaseRu.innerHTML = key.ru.lowerCase;

  const upperCaseRu = document.createElement('span');
  upperCaseRu.classList.add('upperCase', 'hidden');
  upperCaseRu.innerHTML = key.ru.upperCase;

  const capsRu = document.createElement('span');
  capsRu.classList.add('caps', 'hidden');
  capsRu.innerHTML = key.ru.caps || key.ru.upperCase;

  const shiftCapsRu = document.createElement('span');
  shiftCapsRu.classList.add('shiftCaps', 'hidden');
  shiftCapsRu.innerHTML = key.ru.shiftCaps || key.ru.lowerCase;

  ruSpan.append(lowerCaseRu, upperCaseRu, capsRu, shiftCapsRu);

  const enSpan = document.createElement('span');
  enSpan.classList.add('en');

  const lowerCaseEn = document.createElement('span');
  lowerCaseEn.classList.add('lowerCase');
  lowerCaseEn.innerHTML = key.en.lowerCase;

  const upperCaseEn = document.createElement('span');
  upperCaseEn.classList.add('upperCase', 'hidden');
  upperCaseEn.innerHTML = key.en.upperCase;

  const capsEn = document.createElement('span');
  capsEn.classList.add('caps', 'hidden');
  capsEn.innerHTML = key.en.caps || key.en.upperCase;

  const shiftCapsEn = document.createElement('span');
  shiftCapsEn.classList.add('shiftCaps', 'hidden');
  shiftCapsEn.innerHTML = key.en.shiftCaps || key.en.lowerCase;

  enSpan.append(lowerCaseEn, upperCaseEn, capsEn, shiftCapsEn);
  div.append(ruSpan, enSpan);
  return div;
}

function addActiveState() {
  current.element?.classList.add('active');
}

function removeActiveState() {
  const spec = ['CapsLock', 'ShiftLeft', 'ShiftRight'];

  if (current.element) {
    if (previous.element && previous.element.classList.contains('active')
      && !spec.includes(previous.code)) {
      previous.element.classList.remove('active');
    }
    current.element.classList.remove('active');
  }
}

function toggleCase() {
  const keys = element.querySelectorAll(`div>.${state.lang}`);

  keys.forEach((key) => {
    const spans = key.querySelectorAll('span');
    spans.forEach((s) => {
      if (!s.classList.contains('hidden')) {
        s.classList.add('hidden');
      }
    });

    if ((state.isShiftLeftPressed || state.isShiftRightPressed) && state.isCapsLockPressed) {
      spans[3].classList.remove('hidden');
      state.case = 'shiftCaps';
    } else if (state.isCapsLockPressed) {
      spans[2].classList.remove('hidden');
      state.case = 'caps';
    } else if (state.isShiftLeftPressed || state.isShiftRightPressed) {
      spans[1].classList.remove('hidden');
      state.case = 'upperCase';
    } else {
      spans[0].classList.remove('hidden');
      state.case = 'lowerCase';
    }
  });
}

function toggleHiddenKeys() {
  const keys = element.querySelectorAll(`div>.${state.lang}`);
  keys.forEach((k) => {
    k.classList.toggle('hidden');
    k.querySelectorAll(`span.${state.case}`)[0].classList.toggle('hidden');
  });
}

function changeLanguage() {
  toggleHiddenKeys();

  state.lang = state.lang === 'en'
    ? 'ru'
    : 'en';

  toggleHiddenKeys();
}

function calcTextareaValue(value, selectionStart) {
  if (selectionStart >= 0 && selectionStart <= value.length) {
    textarea.value = value.slice(0, selectionStart)
      + current.char + value.slice(selectionStart, value.length);
    textarea.selectionStart = selectionStart + current.char.length;
    textarea.selectionEnd = selectionStart + current.char.length;
  } else {
    textarea.value += current.char;
  }
}

function implementKeyFunction() {
  let { value } = textarea;
  const { selectionStart } = textarea;

  if (specials.includes(current.code)) {
    switch (current.code) {
      case 'Backspace':
        if (selectionStart > 0 && selectionStart <= value.length) {
          value = value.slice(0, selectionStart - 1) + value.slice(selectionStart, value.length);
          textarea.value = value;
          textarea.selectionStart = selectionStart - 1;
          textarea.selectionEnd = selectionStart - 1;
        }
        break;
      case 'Delete':
        if (selectionStart >= 0 && selectionStart <= value.length - 1) {
          value = value.slice(0, selectionStart) + value.slice(selectionStart + 1, value.length);
          textarea.value = value;
          textarea.selectionStart = selectionStart;
          textarea.selectionEnd = selectionStart;
        }
        break;
      case 'Tab':
        current.char = '    ';
        calcTextareaValue(value, selectionStart);
        break;
      case 'Enter':
        current.char = '\n';
        calcTextareaValue(value, selectionStart);
        break;
      case 'CapsLock':
        if (state.isCapsLockPressed && !current.event.repeat) {
          removeActiveState();
          state.isCapsLockPressed = false;
        } else {
          addActiveState();
          state.isCapsLockPressed = true;
        }
        toggleCase();
        break;
      case 'ShiftLeft':
        if (!(state.isShiftLeftPressed || state.isShiftRightPressed)) {
          addActiveState();
          state.isShiftLeftPressed = true;
          toggleCase();
        }
        break;
      case 'ShiftRight':
        if (!(state.isShiftRightPressed || state.isShiftLeftPressed)) {
          addActiveState();
          state.isShiftRightPressed = !0;
          toggleCase();
        }
        break;
      default:
        break;
    }
  } else {
    calcTextareaValue(value, selectionStart);
  }
  if (current.event.shiftKey && current.event.altKey) {
    changeLanguage();
  }
}

function keyUpHandler(event) {
  const key = element.getElementsByClassName(event.code)[0];
  if (key) {
    current.element = key.closest('div');
    if (event.code !== 'CapsLock') {
      removeActiveState();
    }

    if (event.code === 'ShiftLeft') {
      state.isShiftLeftPressed = false;
      removeActiveState();
      toggleCase();
    } else if (event.code === 'ShiftRight') {
      state.isShiftRightPressed = false;
      removeActiveState();
      toggleCase();
    }
  }
}

function keyDownHandler(event) {
  event.preventDefault();
  current.event = event;
  current.code = event.code;
  [current.element] = element.getElementsByClassName(event.code);

  if (current.element) {
    current.char = current.element.querySelectorAll(':not(.hidden)')[1].textContent;
    implementKeyFunction();

    if (current.code === 'MetaLeft') {
      addActiveState();
      setTimeout(removeActiveState, 500);
    } else if (!['CapsLock', 'ShiftLeft', 'ShiftRight'].includes(current.code)) {
      addActiveState();
    }
  }
}

function mouseDownHandler(event) {
  event.preventDefault();
  if (event.target.tagName === 'SPAN') {
    current.event = event;
    current.element = event.target.closest('.key');
    [, , current.code] = current.element.classList;
    current.char = current.element.querySelectorAll(':not(.hidden)')[1].textContent;
    implementKeyFunction();
    if (current.code !== 'CapsLock') {
      addActiveState();
    }
    previous = {
      ...current,
    };
  }
}

function mouseUpHandler(event) {
  current.event = event;
  current.element = event.target.closest('div');
  if (current.element) {
    if (current.element.classList.contains('key')) {
      [, , current.code] = current.element.classList;
    } else {
      current = {
        ...previous,
      };
    }

    if (current.code !== 'CapsLock') {
      removeActiveState();
      if (state.isShiftLeftPressed && current.code === 'ShiftLeft') {
        state.isShiftLeftPressed = false;
        toggleCase();
      }

      if (state.isShiftRightPressed && current.code === 'ShiftRight') {
        state.isShiftRightPressed = false;
        toggleCase();
      }
    }
  }
}

function initKeyboardEvents() {
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('mouseup', mouseUpHandler);
  element.addEventListener('mousedown', mouseDownHandler);
}

export default function createKeyboard(txtarea) {
  textarea = txtarea;

  const keyboardBody = document.createElement('div');
  element = keyboardBody;
  keyboardBody.id = 'keyboard';
  keyboardBody.classList.add('keyboard__body');
  const keyRows = getKeyRows();
  keyRows.forEach((row) => {
    const div = document.createElement('div');
    div.classList.add('keyboard__row', 'row');
    row.keys.forEach((key) => {
      const keyDiv = createKey(key);
      div.append(keyDiv);
    });
    keyboardBody.append(div);
  });

  changeLanguage();
  initKeyboardEvents();

  return keyboardBody;
}
