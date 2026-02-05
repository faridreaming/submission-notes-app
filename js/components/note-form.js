class NoteForm extends HTMLElement {
  #isSubmitting = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  set isSubmitting(value) {
    this.#isSubmitting = value
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
            flex-direction: column;
            position: relative;
          }
          input, textarea {
            width: 100%;
            padding: 1.625rem 0.75rem 0.625rem;
            font-size: 1rem;
            color: #fff;
            background-color: oklch(27.4% 0.006 286.033);
            border: 1px solid oklch(37% 0.013 285.805);
            border-radius: 0.5rem;
            transition: box-shadow 150ms linear, border-color 150ms linear;
          }
          label {
            position: absolute;
            top: 0;
            left: 0;
            padding: 1.1rem 0.75rem;
            pointer-events: none;
            border: 1px solid transparent;
            transform-origin: 0 0;
            transition: opacity .1s ease-in-out, transform .1s ease-in-out;
            color: oklch(55.2% 0.016 285.938);
          }
          textarea {
            resize: vertical;
            min-height: 8rem;
          }
          p {
            display: none;
            margin-block-start: 0.5rem;
            color: oklch(57.7% 0.245 27.325);
          }
          input:focus ~ label,
          input:not(:placeholder-shown) ~ label,
          textarea:focus ~ label,
          textarea:not(:placeholder-shown) ~ label {
            transform: scale(.85) translateY(-0.65rem) translateX(0.15rem);
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
            transition: all 150ms linear;
          }
          button:focus-visible {
            appearance: none;
            outline: none;
            box-shadow: 0 0 0 4px oklch(40.5% 0.101 131.063);
          }
          button:hover {
            cursor: pointer;
            background-color: oklch(64.8% 0.2 131.684);
          }
          button:active {
            background-color: oklch(45.3% 0.124 130.933);
          }
          button:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }
          .loader {
            width: 1.25rem;
            height: 1.25rem; 
            border: 0.225rem solid rgba(255, 255, 255, 0.25);
            border-top: 0.225rem solid #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 480px) {
          button {
            width: 100%;
            justify-content: center;
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
          <input 
            type="text" 
            id="note-title" 
            name="note-title" 
            autocomplete="on" 
            placeholder=" " 
            required 
            maxlength="50"
            aria-describedby="noteTitleValidationMessage" 
          />
          <label for="note-title">Title</label>
          <p id="noteTitleValidationMessage" aria-live="polite"></p>
        </div>
        <div>
          <textarea 
            id="note-content" 
            name="note-content" 
            placeholder=" " 
            required 
            minlength="5"
            maxlength="500"
            rows="5"
            aria-describedby="noteContentValidationMessage"
          ></textarea>
          <label for="note-content">Note Content</label>
          <p id="noteContentValidationMessage" aria-live="polite"></p>
        </div>
        <button ${this.#isSubmitting ? 'disabled' : ''}>
          ${
            this.#isSubmitting
              ? '<div class="loader"></div>'
              : `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          `
          }
          Add Note
        </button>
      </form>
    `
    const form = this.shadowRoot.querySelector('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('note-submit', { bubbles: true }))
    })
  }
}

customElements.define('note-form', NoteForm)
