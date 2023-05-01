export default function createAnnotation() {
  const div = document.createElement('div');
  div.classList.add('annotation');

  const p1 = document.createElement('p');
  p1.innerText = 'Клавиатура создана в операционной системе Windows';
  p1.classList.add('description');
  const p2 = document.createElement('p');
  p2.innerText = 'Для переключения языка комбинация: левыe shift + alt';
  p2.classList.add('language');
  div.append(p1, p2);
  return div;
}
