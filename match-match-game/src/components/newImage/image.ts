import './img/user.png';

class Image {

  public element: HTMLImageElement = document.createElement('img');

  constructor(url: string) {
    this.element.setAttribute('alt', 'Image');
    this.element.setAttribute('src', url);
  }

}

export { Image as default };