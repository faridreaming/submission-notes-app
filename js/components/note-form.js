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
            font-size: 1.17rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            svg {
              width: 1.25rem;
              height: 1.25rem;
            }
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
            align-self: flex-end;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          button:focus-visible {
            appearance: none;
            outline: none;
            box-shadow: 0 0 0 4px oklch(40.5% 0.101 131.063);
          }
        }
      </style>
      <form>
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-form-icon lucide-form">
            <path d="M4 14h6" />
            <path d="M4 2h10" />
            <rect x="4" y="18" width="16" height="4" rx="1" />
            <rect x="4" y="6" width="16" height="4" rx="1" />
          </svg>
          Add a New Note
        </h2>
        <div>
          <input type="text" id="note-title" name="note-title" autocomplete="off" required />
        </div>
        <div>
          <textarea id="note-content" name="note-content" required></textarea>
        </div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Note
        </button>
      </form>
    `
  }
}

customElements.define('note-form', NoteForm)
