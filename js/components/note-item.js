class ClubItem extends HTMLElement {
  #note = {
    id: null,
    title: '',
    body: '',
    createdAt: null,
    archived: false,
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  set note(note) {
    this.#note = note
    this.render()
  }

  get note() {
    return this.#note
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
        .note-item {
          background-color: oklch(21% 0.006 285.885);
          border: 1px solid oklch(27.4% 0.006 286.033);
          border-radius: 1rem;
          padding: 1rem;
          margin-block-end: 1rem;
        }
        .note-item h3 {
          font-size: 1.25rem;
          color: white;
          margin-block-end: 0.5rem;
        }
        .note-item p {
          font-size: 1rem;
          color: oklch(70% 0.02 285.885);
        }
      </style>
      <div class="note-item">
        <h3>${this.#note.title}</h3>
        <p>${this.#note.body}</p>
      </div>
    `
  }
}

customElements.define('club-item', ClubItem)
