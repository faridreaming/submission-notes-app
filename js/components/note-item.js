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
    this.#setupDropdown()
  }

  #setupDropdown() {
    const dropdownBtn = this.shadowRoot.querySelector('.dropdown-btn')
    const dropdownContent = this.shadowRoot.querySelector('.dropdown-content')
    const deleteBtn = this.shadowRoot.querySelector('#deleteBtn')
    const toggleArchiveBtn = this.shadowRoot.querySelector('#toggleArchiveBtn')

    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation()

      document.querySelectorAll('note-item').forEach((noteItem) => {
        if (noteItem !== this) {
          noteItem.closeDropdown()
        }
      })

      dropdownContent.classList.toggle('show')
    })

    document.addEventListener('click', () => {
      dropdownContent.classList.remove('show')
    })

    dropdownContent.addEventListener('click', (e) => {
      e.stopPropagation()
    })

    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-delete', {
          bubbles: true,
          composed: true,
          detail: { id: this.#note.id },
        }),
      )
      this.closeDropdown()
    })

    toggleArchiveBtn.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-archive-toggle', {
          bubbles: true,
          composed: true,
          detail: {
            id: this.#note.id,
            archived: this.#note.archived,
          },
        }),
      )
      this.closeDropdown()
    })
  }

  closeDropdown() {
    const dropdownContent = this.shadowRoot.querySelector('.dropdown-content')
    if (dropdownContent) {
      dropdownContent.classList.remove('show')
    }
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            .dropdown {
              position: relative;
            }
            .dropdown-btn {
              background: none;
              border: none;
              cursor: pointer;
              padding: 0.5rem;
              color: #fff;
              border-radius: 9999px;
              display: flex;
            }
            .dropdown-btn:hover {
              background-color: oklch(27.4% 0.006 286.033);
            }
            .dropdown-content {
              position: absolute;
              top: 2.5rem;
              right: 0;
              z-index: 1;
              display: flex;
              flex-direction: column;
              background-color: oklch(21% 0.006 285.885);
              border: 1px solid oklch(27.4% 0.006 286.033);
              border-radius: 1rem;
              padding: 0.5rem;
              gap: 0.5rem;
              opacity: 0;
              scale: 0.9;
              transform-origin: top right;
              pointer-events: none;
              transition: opacity 0.2s ease, scale 0.2s ease;
              button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
                color: #fff;
                border-radius: 0.5rem;
                display: flex;
                width: 100%;
                justify-content: center;
              }
              button#deleteBtn {
                color: oklch(57.7% 0.245 27.325);
              }
              button#toggleArchiveBtn:hover {
                background-color: oklch(27.4% 0.006 286.033);
              }
              button#deleteBtn:hover {
                background-color: oklch(28.6% 0.066 53.813 / 0.5);
              }
            }
            .dropdown-content.show {
              opacity: 1;
              scale: 1;
              pointer-events: auto;
            }
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
        <h3>
          ${this.#note.title}
          <div class="dropdown">
            <button type="button" class="dropdown-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
            <div class="dropdown-content">
              <button type="button" id="toggleArchiveBtn">${this.#note.archived ? 'Unarchive' : 'Archive'}</button>
              <button type="button" id="deleteBtn">Delete</button>
            </div>
          </div>
        </h3>
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
