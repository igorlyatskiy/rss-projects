class BaseComponent {
  readonly element: HTMLElement;

  constructor(el: keyof HTMLElementTagNameMap = 'div', classes: string[] = []) {
    this.element = document.createElement(el);
    this.element.classList.add(...classes);
  }

  clearComponent() {
    this.element.innerHTML = '';
  }

  makeElement = (element: string, classList: string[] = [], text: string) => {
    const el = document.createElement(element);
    el.classList.add(...classList);
    el.innerHTML = (text) || '';
    return el;
  };

}

export { BaseComponent };