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
          background-color: oklch(21% 0.006 285.885);
          border: 1px solid oklch(27.4% 0.006 286.033);
          border-radius: 1rem;
          padding: 1rem;
          margin-block-start: 2rem;
          h2 {
            font-weight: normal;
            font-size: 1rem;
          }
          div {
            display: flex;
          }
          input, textarea {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            color: #fff;
            background-color: oklch(27.4% 0.006 286.033);
            border: 1px solid oklch(37% 0.013 285.805);
            border-radius: 0.5rem;
            transition: box-shadow 150ms linear;
          }
          textarea {
            resize: vertical;
            min-height: 8rem;
          }
          input:focus-visible, textarea:focus-visible {
            appearance: none;
            outline: none;
            border-color: oklch(53.2% 0.157 131.589);
            box-shadow: 0 0 0 4px oklch(40.5% 0.101 131.063);
          }
          button {
            color: white;
            background-color: oklch(53.2% 0.157 131.589);
            border: 1px solid oklch(45.3% 0.124 130.933);
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            border-radius: 0.5rem;
            width: fit-content;
            align-self: flex-end;
          }
          button:focus-visible {
            appearance: none;
            outline: none;
            box-shadow: 0 0 0 4px oklch(40.5% 0.101 131.063);
          }
        }
      </style>
      <form>
        <h2>Add a New Note</h2>
        <div>
          <input type="text" id="note-title" name="note-title" autocomplete="off" required />
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
