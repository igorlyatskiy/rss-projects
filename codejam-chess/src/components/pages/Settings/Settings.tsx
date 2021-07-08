import React, { FormEvent } from "react";
import "./Settings.sass";
import "./Bootstrap.css";

interface SettingsProps {
  changeRandomPlayerSides: (status: boolean) => void;
  changeAiLevel: (number: number) => void;
  areRandomSidesEnabled: boolean;
}

export default class Settings extends React.PureComponent<SettingsProps> {
  changePlayerSides = (e: FormEvent) => {
    const { changeRandomPlayerSides } = this.props;
    const input = e.target as HTMLInputElement;
    changeRandomPlayerSides(!input.checked);
  };

  changeBotLevel = (level: number) => {
    const { changeAiLevel } = this.props;
    changeAiLevel(level);
  };

  render() {
    const { areRandomSidesEnabled } = this.props;
    return (
      <div className='settings'>
        <>
          <div className='settings__block'>
            <h3 className='settings__heading'>Random player sides</h3>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='random-sides'
                onInput={this.changePlayerSides}
                checked={areRandomSidesEnabled}
                readOnly
              />
              <label className='form-check-label' htmlFor='random-sides'>
                Enabled
              </label>
            </div>
          </div>
          <div className='settings__block'>
            <h3 className='settings__heading'>Autopromotion into the queen</h3>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='autopromotion' />
              <label className='form-check-label' htmlFor='autopromotion'>
                Enabled
              </label>
            </div>
          </div>
          <div className='settings__block'>
            <h3 className='settings__heading'>Bot level</h3>
            <p>
              <input
                type='radio'
                id='ez-bot'
                name='radio-group'
                defaultChecked
                onInput={() => this.changeBotLevel(1)}
              />
              <label htmlFor='ez-bot'>Eazy</label>
            </p>
            <p>
              <input type='radio' id='hard-bot' name='radio-group' onInput={() => this.changeBotLevel(2)} />
              <label htmlFor='hard-bot'>Hard</label>
            </p>
            <p>
              <input type='radio' id='unreal-bot' name='radio-group' onInput={() => this.changeBotLevel(3)} />
              <label htmlFor='unreal-bot'>Unreal</label>
            </p>
          </div>
        </>
      </div>
    );
  }
}
