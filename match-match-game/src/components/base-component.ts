export class BaseComponent {
  readonly element: HTMLElement;

  constructor(el: keyof HTMLElementTagNameMap = 'div', classes: string[] = []) {
    this.element = document.createElement(el);
    this.element.classList.add(...classes);
  }

  append(where: HTMLElement, what: HTMLElement) {
    where.append(what);
  }

  prepend(where: HTMLElement, what: HTMLElement) {
    where.prepend(what);
  }

  clearComponent() {
    this.element.innerHTML = '';
  }

  makeElement(element: string, classList: string[] = [], text: string) {
    const el = document.createElement(element);
    el.classList.add(...classList);
    (text) ? el.innerHTML = text : 0;
    return el;
  }
}