import '../../img/user.png';

export class Image {

  public element: HTMLImageElement = document.createElement('img');

  constructor(url: string) {
    this.element.setAttribute('alt', 'Image');
    this.element.setAttribute('crossOrigin', 'anonymous');
    this.element.setAttribute('src', url);
  }

}