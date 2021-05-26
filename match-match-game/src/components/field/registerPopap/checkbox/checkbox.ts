import './img/marker.png';
import './checkbox.sass';

class Checkbox {
  public element: HTMLImageElement = document.createElement('img');

  constructor() {
    const REGISTER_POPAP_MARKER_LINK = './img/marker.png';
    this.element.classList.add('popap__marker');
    this.element.setAttribute('src', REGISTER_POPAP_MARKER_LINK);
    this.element.setAttribute('alt', 'Marker');
  }
}

export { Checkbox as default };