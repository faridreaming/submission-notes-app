class AlertError extends HTMLElement {
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: oklch(57.7% 0.245 27.325);
          background-color: oklch(25.8% 0.092 26.042 / 0.5);
        }
      </style>
      <div class="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        ${this.message}
      </div>
    `
  }
}

customElements.define('alert-error', AlertError)
