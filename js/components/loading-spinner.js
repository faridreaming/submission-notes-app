class LoadingSpinner extends HTMLElement {
  static get observedAttributes() {
    return ['size', 'color', 'border-width']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  get size() {
    return this.getAttribute('size') || '1.25rem'
  }

  get color() {
    return this.getAttribute('color') || '#fff'
  }

  get borderWidth() {
    return this.getAttribute('border-width') || '0.225rem'
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        .spinner {
          width: ${this.size};
          height: ${this.size};
          border: ${this.borderWidth} solid rgba(255, 255, 255, 0.25);
          border-top: ${this.borderWidth} solid ${this.color};
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner"></div>
    `
  }
}

customElements.define('loading-spinner', LoadingSpinner)
