import Constants from '../../constants';

class Validation {
  public readonly Constants: Constants = new Constants();

  checkEmail(input: HTMLInputElement) {
    if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(input.value)) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
    return this;
  }

  checkText(input: HTMLInputElement) {
    const isNumberValid = String(input.value).split('').filter((e) => !Number.isNaN(parseInt(e, 10))).length !== String(input.value).length;
    const flag = String(input.value).length !== 0 &&
      isNumberValid &&
      String(input.value).split('').filter((e) => this.Constants.forbiddenSymbols.includes(e)).length === 0 &&
      String(input.value).split(' ').length <= 1;
    if (flag) {
      input.classList.add('input_active');
    } else {
      input.classList.remove('input_active');
    }
  }

}

export { Validation as default };