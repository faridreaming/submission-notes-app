class NoteForm extends HTMLElement {
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
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-block-start: 2rem;
          div {
            display: flex;
          }
          input, textarea {
            width: 100%;
            padding: 1rem;
            font-size: 1rem;
            color: #fff;
            background-color: oklch(27.4% 0.006 286.033);
            border: 1px solid oklch(37% 0.013 285.805);
            border-radius: 0.5rem;
          }
          textarea {
            resize: vertical;
            min-height: 8rem;
          }
          button {
            color: white;
            background-color: oklch(53.2% 0.157 131.589);
            border: none;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            border-radius: 0.5rem;
            width: fit-content;
            align-self: flex-end;
          }
        }
      </style>
      <form>
        <div>
          <input type="text" id="note-title" name="note-title" required />
        </div>
        <div>
          <textarea id="note-content" name="note-content" required></textarea>
        </div>
        <button>
          <img src="../../assets/plus-icon.svg" alt="Add Note Icon" />
          Add Note
        </button>
      </form>
    `
  }
}

customElements.define('note-form', NoteForm)
