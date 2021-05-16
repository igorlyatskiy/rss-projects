import { Constants } from './../../../constants';
import { SettingsInput } from './settingsInput/settingsInput';
import { BaseComponent } from "../../../base-component";
import "./settingsPage.sass";
export class settingsPage extends BaseComponent {
  public readonly Inputs: SettingsInput[] = [];
  public readonly Constants: Constants = new Constants();
  constructor() {
    super("div", ["settings-wrapper"]);
    this.Constants.SettingsTitle.forEach((e, index) => {
      this.element.append(this.makeElement("p", ["settings__title"], this.Constants.SettingsTitle[index]));
      this.Inputs.push(new SettingsInput(this.Constants.SettingsContent[index], this.Constants.SettingsOptions[index]));
      this.element.append(this.Inputs[index].element);
    });
  }
}