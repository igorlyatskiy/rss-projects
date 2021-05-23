import { Constants } from './constants';

export class Validation {
  public readonly Constants: Constants = new Constants();

  private readonly emailexpr: RegExp = new RegExp("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{1}(\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+\.([a-zA-Z0-9]{2,6})$");

  checkEmail(input: HTMLInputElement) {
    if (this.emailexpr.test(input.value)) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
  }

  checkText(input: HTMLInputElement) {
    const flag = String(input.value).length !== 0 &&
      String(input.value).split('').filter((e) => typeof e === 'number').length === 0 &&
      String(input.value).split('').filter((e) => this.Constants.forbiddenSymbols.includes(e)).length === 0 &&
      String(input.value).split(' ').length <= 1;
    if (flag) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
    return input.classList;
  }

}