class AlertMessage extends HTMLElement {
  static observedAttributes = ['message']

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.message = this.getAttribute('message') || ''
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      this.render()
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .alert {
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          color: oklch(62.3% 0.214 259.815);
          background-color: oklch(28.2% 0.091 267.935 / 0.5);
        }
      </style>
      <div class="alert">
        ${this.message}
      </div>
    `
  }
}

customElements.define('alert-message', AlertMessage)
