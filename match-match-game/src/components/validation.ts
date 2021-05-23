import { Constants } from './constants';

export class Validation {
  public readonly Constants: Constants = new Constants();

  checkEmail(input: HTMLInputElement) {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(input.value)) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
  }

  checkText(input: HTMLInputElement) {
    const flag = String(input.value).length !== 0 &&
      String(input.value).split('').filter((e) => !Number.isNaN(+e)).length === 0 &&
      String(input.value).split('').filter((e) => this.Constants.forbiddenSymbols.includes(e)).length === 0 &&
      String(input.value).split(' ').length <= 1;
    if (flag) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
  }

}