import '../img/marker.png';
import './checkbox.sass';

export class Checkbox {
  public element: HTMLImageElement;

  constructor() {
    this.element = document.createElement('img');
    this.element.classList.add('popap__marker');
    this.element.setAttribute('src', '../img/marker.png');
    this.element.setAttribute('alt', 'Marker');
  }
}