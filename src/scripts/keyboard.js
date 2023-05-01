import getKeyRows from './data';

let element = null;

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
  shiftCapsRu.innerHTML = key.ru.shiftCaps || key.ru.lowerCas;

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

function initKeyboardEvents() {

}

function initKeyEvent(key) {
  if (key) {
    key.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const item = event.currentTarget;
      item.classList.add('active');
    });

    key.addEventListener('mouseup', (event) => {
      event.preventDefault();
      const item = event.currentTarget;
      item.classList.remove('active');
    });
  }
}

export default function createKeyboard() {
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
      initKeyEvent(keyDiv);
      div.append(keyDiv);
    });
    keyboardBody.append(div);
  });

  initKeyboardEvents();

  return keyboardBody;
}
