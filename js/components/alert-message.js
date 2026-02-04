class AlertMessage extends HTMLElement {
  static observedAttributes = ['message', 'type']

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.message = this.getAttribute('message') || ''
    this.type = this.getAttribute('type') || 'info'
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

  getTypeStyles() {
    const types = {
      info: {
        color: 'oklch(62.3% 0.214 259.815)',
        background: 'oklch(28.2% 0.091 267.935 / 0.5)',
      },
      success: {
        color: 'oklch(72.3% 0.219 149.579)',
        background: 'oklch(26.6% 0.065 152.934 / 0.5)',
      },
      warning: {
        color: 'oklch(79.5% 0.184 86.047)',
        background: 'oklch(28.6% 0.066 53.813 / 0.5)',
      },
      error: {
        color: 'oklch(63.7% 0.237 25.331)',
        background: 'oklch(25.8% 0.092 26.042 / 0.5)',
      },
    }
    return types[this.type] || types.info
  }

  render() {
    const styles = this.getTypeStyles()

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .alert {
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          color: ${styles.color};
          background-color: ${styles.background};
        }
      </style>
      <div class="alert">
        ${this.message}
      </div>
    `
  }
}

customElements.define('alert-message', AlertMessage)
