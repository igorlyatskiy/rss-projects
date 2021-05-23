import { Controller } from './mvc/controller';
import '../css/main.sass';

window.onload = () => {
  const rootElement = document.getElementById('root');
  if (rootElement !== null) {
    const controller = new Controller(rootElement);
  } else {
    throw new Error('Root element does not exist');
  }
};