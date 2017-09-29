import { html, render, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/lib/repeat';

export class GrilledCheese extends HTMLElement {
  public cheese: string[] = ['cheddar'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes(): string[] {
    return ['pickles', 'quantity'];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }

  get pickles(): boolean {
    return this.hasAttribute('pickles');
  }

  set pickles(value: boolean) {
    if (value) {
      this.setAttribute('pickles', '');
    } else {
      this.removeAttribute('pickles');
    }
  }

  get quantity(): number {
    if (this.hasAttribute('quantity')) {
      return Number(this.getAttribute('quantity'));
    } else {
      return 1;
    }
  }

  set quantity(value: number) {
    if (value) {
      this.setAttribute('quantity', String(value));
    } else {
      this.removeAttribute('quantity');
    }
  }

  private get styles(): TemplateResult {
    return html`
      <style>
        :host {
          display: block;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0 ,0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        }

        :host([hidden]) {
          display: none;
        }

        .content {
          background-color: var(--grilled-cheese-background-color, #FAFAFA);
          color: #212121;
          padding: 16px;
        }

        ul {
          list-style: none;
        }
      </style>
    `;
  }

  private get sandwich(): TemplateResult {
    return html`
      🍞${repeat(this.cheese, (i) => i, () => html`🧀`)}${this.pickles ? '🥒' : ''}🍞`;
  }

  private get template(): TemplateResult {
    return html`
      ${this.styles}
      <div class="content">
        <p>&lt;grilled-cheese&gt;</p>
        <ul>
          ${repeat(new Array(this.quantity), (i) => i, () => html`
            <li>${this.sandwich}</li>`)}
        </ul>
      </div>
    `;
  }

  render() {
    render(this.template, this.shadowRoot);
  }
}

window.customElements.define('grilled-cheese', GrilledCheese);
