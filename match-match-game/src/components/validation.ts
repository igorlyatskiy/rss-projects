import { Constants } from './constants';
export class Validation {
  public readonly Constants: Constants = new Constants();
  checkEmail(input: HTMLInputElement) {
    (String(input.value).length !== 0 && String(input.value).split("").includes(".") && String(input.value).split("").includes("@")) ? input.classList.add("input_active") : input.classList.remove("input_active");
  }

  checkText(input: HTMLInputElement) {
    const flag = String(input.value).length !== 0 &&
      String(input.value).split("").filter((e) => typeof e === "number").length === 0 &&
      String(input.value).split("").filter((e) => this.Constants.forbiddenSymbols.includes(e)).length === 0 &&
      String(input.value).split(" ").length <= 1;
    (flag) ? input.classList.add("input_active") : input.classList.remove("input_active");
    return input.classList;
  }

}