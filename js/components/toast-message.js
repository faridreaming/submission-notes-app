class ToastMessage extends HTMLElement {
  static get observedAttributes() {
    return ['message']
  }

  constructor() {
    super()
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
    this.innerHTML = `
      <style>
        toast-message {
          display: block;
        }
        
        .toast {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          width: fit-content;
          color: oklch(14.1% 0.005 285.823);
          background-color: oklch(98.5% 0 0);
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          bottom: -100%;
          transition: all 0.3s ease-in-out;
        }
      </style>
      <div class="toast">
        ${this.message}
      </div>
    `
  }
}

customElements.define('toast-message', ToastMessage)
