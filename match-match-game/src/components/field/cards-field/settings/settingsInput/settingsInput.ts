import './settingsInput.sass';

class SettingsInput {
  public element: HTMLSelectElement;

  constructor(title: string, options: string[]) {
    this.element = document.createElement('select');
    this.element.classList.add('form-select');

    const selectedOption = document.createElement('option');
    selectedOption.setAttribute('selected', 'selected');
    selectedOption.textContent = title;
    this.element.append(selectedOption);

    this.initOptions(options);
  }

  initOptions = (options: string[]) => {
    options.forEach((e) => {
      const option = document.createElement('option');
      option.textContent = e;
      this.element.append(option);
    });
  };

}

export { SettingsInput as default };