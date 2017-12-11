import { html, render, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/lib/repeat';

export default class GrilledCheese extends HTMLElement {
  public cheese: string[] = ['cheddar'];
  /** The constructor always attaches a shadowRoot so no need for it to be null. */
  public shadowRoot: ShadowRoot;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /** The element instance has been inserted into the DOM. */
  connectedCallback() {
    this.upgradeProperties();
    this.render();
  }

  /** The element instance has been removed from the DOM. */
  disconnectedCallback() {
  }

  /** Watch for changes to these attributes. */
  static get observedAttributes(): string[] {
    return ['pickles', 'quantity'];
  }

  /** Rerender when the observed attributes change. */
  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }

  /** Rerender the element. */
  render() {
    render(this.template, this.shadowRoot);
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

  /** Support lazy properties https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties */
  private upgradeProperties() {
    (<any>this).constructor['observedAttributes'].forEach((prop: string) => {
      if (this.hasOwnProperty(prop)) {
        let value = (<any>this)[prop];
        delete (<any>this)[prop];
        (<any>this)[prop] = value;
      }
    });
  }

  /** Styling for the element. */
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

  /** HTML Template for the element. */
  private get template(): TemplateResult {
    return html`
      ${this.styles}
      <div class="content">
        <p>&lt;grilled-cheese&gt;</p>

        <ul>
          ${repeat(new Array(this.quantity), (i) => i, () => html`
            <li>${this.sandwich}</li>`)}
        </ul>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('grilled-cheese', GrilledCheese);
