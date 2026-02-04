class FooterApp extends HTMLElement {
  static observedAttributes = ['author', 'year', 'link']

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.author = this.getAttribute('author') || 'Farid'
    this.year = this.getAttribute('year') || new Date().getFullYear()
    this.link = this.getAttribute('link') || '#'
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

        footer {
          padding-block: 2rem;
          margin-block-start: 2rem;
          text-align: center;
          border-top: 1px solid oklch(27.4% 0.006 286.033);
        }

        p {
          margin: 0;
          color: oklch(55.2% 0.016 285.938);
        }

        a {
          color: oklch(53.2% 0.157 131.589);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      </style>
      <footer>
        <p>&copy; ${this.year} <a href="${this.link}" target="_blank" rel="noopener noreferrer">${this.author}</a>. All rights reserved.</p>
      </footer>
    `
  }
}

customElements.define('footer-app', FooterApp)
