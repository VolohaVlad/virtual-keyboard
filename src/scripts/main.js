import createAnnotation from './annotation';
import createKeyboard from './keyboard';
import createTextarea from './textarea';

export default function createMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  const header = document.createElement('h1');
  header.classList.add('title');
  header.innerHTML = 'RSS Виртуальная клавиатура';

  const textarea = createTextarea();
  const keyboard = createKeyboard();
  const annotation = createAnnotation();

  main.append(header, textarea, keyboard, annotation);
  return main;
}
