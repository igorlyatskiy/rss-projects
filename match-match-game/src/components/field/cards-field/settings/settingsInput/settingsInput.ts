import { BaseComponent } from "../../../../base-component";
import "./settingsInput.sass";
export class SettingsInput {
  public element: HTMLSelectElement;
  constructor(title: string, options: string[]) {
    this.element = document.createElement("select");
    this.element.classList.add("form-select");
    this.element.innerHTML = `
    <option selected>${title}</option>`;
    options.forEach((e) => {
      const option = document.createElement("option");
      option.innerHTML = e;
      this.element.append(option);
    });
  }
}