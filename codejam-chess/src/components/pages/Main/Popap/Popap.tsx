import React from "react";
import "./Popap.sass";

interface PopapProps {
  playerName: string;
  id: number;
  setPlayerName: (string: string, id: number) => void;
}

class Popap extends React.PureComponent<PopapProps> {
  public editingName: string = "";

  onInput = (event: any) => {
    this.editingName = event.target.value;
  };

  onBtnClick = () => {
    const { setPlayerName, id } = this.props;
    setPlayerName(this.editingName, id);
  };

  render() {
    const { playerName } = this.props;
    return (
      <div className='main-page-popap-background main-page-popap-background_active'>
        <div className='main-page-popap'>
          <h4 className='main-page-popap__heading'>Content</h4>
          <div>
            <input
              type='text'
              className='main-page-popap__input main-page-popap__input_light'
              placeholder='Enter name'
              onInput={this.onInput}
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
