import './index.html';
import './app.scss';
import createMain from './scripts/main';

function createBody() {
  const body = document.getElementById('app');
  const main = createMain();

  body.append(main);
}

document.addEventListener('DOMContentLoaded', () => {
  createBody();
});
