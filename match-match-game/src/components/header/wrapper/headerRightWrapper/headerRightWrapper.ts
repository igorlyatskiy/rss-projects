import { BaseComponent } from './../../../base-component';
export class headerRightWrapper extends BaseComponent {
  constructor() {
    super('div', ['header__right-wrapper']);
  }

  showGuest(){
    this.clearComponent();
    
  }


}