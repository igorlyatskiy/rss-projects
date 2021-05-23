import './navElement.sass';

class NavElement {
  public element: HTMLElement=document.createElement('nav');

  constructor(imgSrc: string, private text: string, private name: string) {
    this.element.classList.add('nav__element');
    this.element.innerHTML = `
    <img src="${imgSrc}" alt="image" class="nav__img nav__img_${name}"></img>
    <p class="nav__text nav__text__${name}">${text}</p>
    `;
  }
}

export { NavElement as default };