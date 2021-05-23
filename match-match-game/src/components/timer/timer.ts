import BaseComponent from '../base-component';
import './timer.sass';

class Timer extends BaseComponent {
  public minutes = 0;

  public seconds = 0;

  private interval: number;

  constructor() {
    super('div', ['timer']);
    this.element.innerText = '00:00';
    this.startTimer();
  }

  startTimer = () => {
    this.interval = window.setInterval(this.addSecond, 1000);
  };

  stopTimer = () => {
    window.clearInterval(this.interval);
  };

  addSecond = () => {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes += 1;
    }
    this.drawTime();
  };

  drawTime() {
    const minutes = (String(this.minutes).length === 1) ? `0${String(this.minutes)}` : String(this.minutes);
    const seconds = (String(this.seconds).length === 1) ? `0${String(this.seconds)}` : String(this.seconds);
    this.element.innerText = `${minutes}:${seconds}`;
  }

  getTime = () => {
    return `${this.minutes + +(this.seconds / 100).toFixed(2)}`;
  };
}

export { Timer as default };