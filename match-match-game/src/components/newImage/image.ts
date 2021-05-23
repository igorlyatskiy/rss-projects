import { App } from '../../ts/app';
import '../../img/user.png';
import { app } from '../../ts/index';

export class Image {
  public app: App;

  public element: HTMLImageElement = document.createElement('img');

  constructor() {
    this.app = app;

    this.element.setAttribute('alt', 'Image');
    this.element.setAttribute('crossOrigin', 'anonymous');
    this.element.setAttribute('src', this.app.Controller.Model.user.avatar);
  }
}