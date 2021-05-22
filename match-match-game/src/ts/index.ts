import { App } from './app';
import '../css/main.sass';

let app: App;
window.onload = () => {
  app = new App();
}
export { app };