export default function createTextarea() {
  const div = document.createElement('div');
  div.classList.add('textarea__wrapper');

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.id = 'textarea';
  textarea.rows = 5;
  textarea.cols = 50;

  return textarea;
}
