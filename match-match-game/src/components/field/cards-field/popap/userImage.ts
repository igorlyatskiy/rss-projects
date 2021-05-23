import './img/userDark.png';

export class UserImage {
  public input: HTMLInputElement;

  public img: HTMLImageElement;

  constructor() {
    const DEFAULT_DARK_USER_URL = './img/userDark.png';
    this.input = document.createElement('input');
    this.input.classList.add('popap__input_file');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('title', 'Choose a file');

    this.img = document.createElement('img');
    this.img.classList.add('popap__img');

    this.img.setAttribute('src', DEFAULT_DARK_USER_URL);
    this.img.setAttribute('alt', 'User image');
  }
}