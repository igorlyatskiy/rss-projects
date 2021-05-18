import { BaseComponent } from "../base-component";
import "./timer.sass";
export class Timer extends BaseComponent {
  public minutes = 0;
  public seconds = 0;
  constructor() {
    super("div", ["timer"]);
    this.element.innerText = "00:00";
    this.startTimer();
  }

  startTimer = () => {
    const interval = setInterval(this.addSecond, 1000);
  }

  stopTimer() {
    // clearInterval(this.interval);
  }

  addSecond = () => {
    this.seconds++;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes++;
    }
    this.drawTime();
  }

  drawTime() {
    const minutes = (String(this.minutes).length === 1) ? "0" + String(this.minutes) : String(this.minutes);
    const seconds = (String(this.seconds).length === 1) ? "0" + String(this.seconds) : String(this.seconds);
    this.element.innerText = `${minutes}:${seconds}`;
  }

  getTime = () => {
    console.log(this.minutes, this.seconds);
    return `${this.minutes + +(this.seconds / 100).toFixed(2)}`;
  }
}