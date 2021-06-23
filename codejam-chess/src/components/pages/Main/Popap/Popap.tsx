import React from "react";

class Popap extends React.PureComponent {
  render() {
    return (
      <div className='main-page-popap-background'>
        <div className='main-page-popap'>
          <h4>Content</h4>
          <input type='text' />
          <input type='text' />
          <button type='button'>Change</button>
        </div>
      </div>
    );
  }
}

export { Popap as default };
