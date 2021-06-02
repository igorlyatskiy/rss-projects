import './img/userDark.png';
import Constants from '../../constants';

class UserImage {
  public readonly Constants: Constants = new Constants();
  public input: HTMLInputElement = document.createElement('input');
  public img: HTMLImageElement = document.createElement('img');

  constructor() {
    this.initElement(this.input, this.Constants.UserImageInputObject);
    this.initElement(this.img, this.Constants.UserImagePictureObject);
  }

  initElement = (element: HTMLInputElement | HTMLImageElement, object: object) => {
    const keys = Object.keys(object);
    keys.forEach((e) => element.setAttribute(e, object[e as keyof object]));
  };

  changeSrc = (url: string) => {
    this.img.setAttribute('src', url);
  };
}

export { UserImage as default };