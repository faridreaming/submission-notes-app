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
          h1, p {
            margin: 0;
          }
          h1 {
            margin-block-start: 1rem;
            span {
              background: linear-gradient(to right, oklch(76.8% 0.233 130.85), oklch(84.1% 0.238 128.85));
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent; 
            }
          }
          p {
            margin-block-start: 0.5rem;
          }
        }
      </style>
      <div class="wrapper">
        <div>
          <img src="../../assets/logo.svg" alt="Logo" />
        </div>
        <h1>NoteApps <span>Farid</span></h1>
        <p>Personal Notes App</p>
      </div>
    `
  }
}

customElements.define('logo-type', LogoType)
