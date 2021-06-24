import React from "react";
import Constants from "../../../Constants";
import "./Popap.sass";

interface PopapProps {
  playerName: string;
  id: number;
  setPlayerName: (string: string, id: number) => void;
  status: boolean;
  hidePopap: () => void;
}

class Popap extends React.PureComponent<PopapProps> {
  public editingName: string = "";
  public containerClassName: string = Constants.mainPagePopapContainerClassName;

  onInput = (event: any) => {
    this.editingName = event.target.value;
  };

  onBtnClick = () => {
    const { setPlayerName, id } = this.props;
    setPlayerName(this.editingName, id);
    this.clearPopap();
  };

  onBackgroundClick = () => {
    this.clearPopap();
  };

  clearPopap = () => {
    const { hidePopap } = this.props;
    hidePopap();
    this.editingName = "";
  };

  render() {
    const { playerName, status, id } = this.props;
    return (
      <div
        className={
          status
            ? `${this.containerClassName} ${this.containerClassName}_active`
            : this.containerClassName
        }
      >
        <div
          role='presentation'
          onKeyDown={() => {}}
          onClick={this.onBackgroundClick}
          className='main-page-popap-background'
        />
        <div className='main-page-popap'>
          <h4 className='main-page-popap__heading'>
            Add Player {id} to the game
          </h4>
          <div>
            <input
              type='text'
              className='main-page-popap__input main-page-popap__input_light'
              placeholder='Enter name'
              onInput={this.onInput}
              value={status === false ? "" : undefined}
            />
            <div className='main-page-popap__username'>{playerName}</div>
          </div>
          <button
            type='button'
            className='main-page-popap__btn'
            onClick={this.onBtnClick}
          >
            Change
          </button>
        </div>
      </div>
    );
  }
}

export { Popap as default };
