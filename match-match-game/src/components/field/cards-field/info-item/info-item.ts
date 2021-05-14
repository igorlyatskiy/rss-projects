import { BaseComponent } from './../../../base-component';
import './info-item.sass';
export class InfoItem extends BaseComponent {
  constructor(number: number, text: string, img: string) {
    super('div', ['info-item']);
    const circle = document.createElement("div");
    circle.classList.add('info-item__circle');
    circle.innerHTML = String(number);
    const container = document.createElement("div");
    container.classList.add("info-item__container");
    const image = document.createElement("img");
    image.setAttribute("src", img);
    const p = document.createElement("p");
    p.classList.add("info-item__text");
    p.innerHTML = text;
    this.element.append(container);
    this.element.append(image);
    container.append(circle);
    container.append(p);

    if (number === 1) {
      container.style.height = "230px";
    }
    if (number === 2) {
      container.style.height = "132px";
    }
    if (number === 3) {
      container.style.height = "240px";
    }
  }
}