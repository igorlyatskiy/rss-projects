import React from "react";
import "./Settings.sass";
import "./Bootstrap.css";

export default class Settings extends React.PureComponent {
  render() {
    return (
      <div className='settings'>
        <>
          <div className='settings__block'>
            <h3 className='settings__heading'>Random player sides</h3>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='inlineCheckbox1'>
                Enabled
                <input className='form-check-input' type='checkbox' id='inlineCheckbox1' value='option1' />
              </label>
            </div>
          </div>
          <div className='settings__block'>
            <h3 className='settings__heading'>Autopromotion into the queen</h3>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='inlineCheckbox1'>
                Enabled
                <input className='form-check-input' type='checkbox' id='inlineCheckbox1' value='option1' />
              </label>
            </div>
          </div>
          <div className='settings__block'>
            <h3 className='settings__heading'>Bot level</h3>
            <div className='form-check'>
              <label className='form-check-label' htmlFor='exampleRadios1'>
                Eazy
                <input className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios1' checked />
              </label>
            </div>
            <div className='form-check'>
              <label className='form-check-label' htmlFor='exampleRadios1'>
                Hard
                <input className='form-check-input' type='radio' name='exampleRadios' id='exampleRadios1' />
              </label>
            </div>
          </div>
        </>
      </div>
    );
  }
}
