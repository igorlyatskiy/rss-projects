import './navElement.sass';

class NavElement {
  public element: HTMLElement = document.createElement('nav');

  constructor(imgSrc: string, private text: string, private name: string) {
    this.element.classList.add('nav__element');

    const img = document.createElement("img");
    img.setAttribute("alt", "image");
    img.setAttribute("src", imgSrc);
    img.classList.add(...["nav__img", `nav__img_${name}`]);

    const p = document.createElement("p");
    p.classList.add(...["nav__text", `nav__text__${name}`]);
    p.textContent = text;

    this.element.append(img, p);
  }
}

export { NavElement as default };