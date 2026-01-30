class NoteList extends HTMLElement {
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
        * {
          font-family: "Inter", sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .note-list {
          margin-block-start: 2rem;
        }
      </style>
      <div class="note-list">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('note-list', NoteList)
