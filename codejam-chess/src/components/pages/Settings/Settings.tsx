import React, { FormEvent } from "react";
import "./Settings.sass";
import "./Bootstrap.css";
import Constants from "../../Constants";

interface SettingsProps {
  changeRandomPlayerSides: (status: boolean) => void;
  changeAiLevel: (number: number) => void;
  changeGameMode: (type: string) => void;
  areRandomSidesEnabled: boolean;
  AILevel: number;
  gameType: string;
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

  changeGameMode = (type: string) => {
    const { changeGameMode } = this.props;
    changeGameMode(type);
  };

  render() {
    const { areRandomSidesEnabled, AILevel, gameType } = this.props;
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
                name='bot-level'
                checked={AILevel === 1}
                onClick={() => this.changeBotLevel(1)}
              />
              <label htmlFor='ez-bot'>Eazy</label>
            </p>
            <p>
              <input
                type='radio'
                id='hard-bot'
                name='bot-level'
                checked={AILevel === 2}
                onClick={() => this.changeBotLevel(2)}
              />
              <label htmlFor='hard-bot'>Hard</label>
            </p>
            <p>
              <input
                type='radio'
                id='unreal-bot'
                name='bot-level'
                checked={AILevel === 3}
                onClick={() => this.changeBotLevel(3)}
              />
              <label htmlFor='unreal-bot'>Unreal</label>
            </p>
          </div>
          <div className='settings__block'>
            <h3 className='settings__heading'>Game mode</h3>
            <p>
              <input
                type='radio'
                id='game-mode-pvp'
                name='game-mode'
                checked={gameType === Constants.PVP_OFFLINE_NAME}
                onClick={() => this.changeGameMode(Constants.PVP_OFFLINE_NAME)}
              />
              <label htmlFor='game-mode-pvp'>PvP (offline)</label>
            </p>
            <p>
              <input
                type='radio'
                id='game-mode-ai'
                name='game-mode'
                checked={gameType === Constants.AI_NAME}
                onClick={() => this.changeGameMode(Constants.AI_NAME)}
              />
              <label htmlFor='game-mode-ai'>AI</label>
            </p>
          </div>
        </>
      </div>
    );
  }
}
