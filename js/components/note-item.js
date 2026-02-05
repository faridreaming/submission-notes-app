class NoteItem extends HTMLElement {
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
          height: 100%;
          display: flex;
          flex-direction: column;
          h3 {
            color: white;
            margin-block-end: 1rem;
            padding-block-end: 1rem;
            font-weight: normal;
            border-bottom: 1px solid oklch(27.4% 0.006 286.033);
          }
          p {
            font-size: 1rem;
            color: oklch(70% 0.02 285.885);
            white-space: pre-line;
            overflow-wrap: break-word;
            word-wrap: break-word;
            margin-block-end: 1rem;
          }
          div {
            margin-block-start: auto;
            color: oklch(44.2% 0.017 285.786);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            svg {
              width: 1rem;
              height: 1rem;
            }
            span {
              font-size: 0.875rem;
            }
          }
        }
      </style>
      <div class="note-item">
        <h3>${this.#note.title}</h3>
        <p>${this.#note.body}</p>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <span>${new Date(this.#note.createdAt).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</span>
        </div>
      </div>
    `
  }
}

customElements.define('note-item', NoteItem)
