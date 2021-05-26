import './img/userDark.png';
import Constants from '../../constants';

class UserImage {
  public readonly Constants: Constants = new Constants();

  public input: HTMLInputElement = document.createElement('input');

  public img: HTMLImageElement = document.createElement('img');

  constructor() {
    const DEFAULT_DARK_USER_URL = './img/userDark.png';

    this.input.classList.add('popap__input_file');
    this.input.setAttribute('type', 'file');
    this.input.setAttribute('title', this.Constants.REGISTER_AVATAR_LOADING_TITLE);

    this.img.classList.add('popap__img');
    this.img.setAttribute('src', DEFAULT_DARK_USER_URL);
    this.img.setAttribute('alt', 'User image');
  }

  changeSrc = (url: string) => {
    this.img.setAttribute('src', url);
  };
}

export { UserImage as default };