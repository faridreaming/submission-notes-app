class LogoType extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-block-start: 2rem;
          div {
            background-color: oklch(53.2% 0.157 131.589);
            width: fit-content;
            height: fit-content;
            padding: 1rem;
            display: flex;
            border-radius: 50%;
            img {
              height: 3rem;
              width: 3rem;
            }
          }
          h1 {
            margin: 0;
          }
        }
      </style>
      <div class="wrapper">
        <div>
          <img src="../../assets/logo.svg" alt="Logo" />
        </div>
        <h1>Note Apps Farid</h1>
      </div>
    `
  }
}

customElements.define('logo-type', LogoType)
