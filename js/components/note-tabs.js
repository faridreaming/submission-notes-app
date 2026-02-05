class NoteTabs extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._activeTab = 'active'
  }

  connectedCallback() {
    this.render()
    this.#setupTabs()
  }

  get activeTab() {
    return this._activeTab
  }

  set activeTab(value) {
    this._activeTab = value
    this.#updateActiveTab()
  }

  #setupTabs() {
    const tabs = this.shadowRoot.querySelectorAll('.tab-button')
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab
        this.activeTab = tabName

        this.dispatchEvent(
          new CustomEvent('tab-change', {
            bubbles: true,
            composed: true,
            detail: { activeTab: tabName },
          }),
        )
      })
    })
  }

  #updateActiveTab() {
    const tabs = this.shadowRoot.querySelectorAll('.tab-button')
    tabs.forEach((tab) => {
      if (tab.dataset.tab === this._activeTab) {
        tab.classList.add('active')
      } else {
        tab.classList.remove('active')
      }
    })
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
        .tabs-container {
          margin-block-start: 2rem;
          margin-block-end: 1rem;
        }
        .tabs {
          display: flex;
          gap: 0.5rem;
          background-color: oklch(21% 0.006 285.885);
          border: 1px solid oklch(27.4% 0.006 286.033);
          border-radius: 1rem;
          padding: 0.5rem;
        }
        .tab-button {
          flex: 1;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: oklch(70% 0.02 285.885);
          font-size: 1rem;
          cursor: pointer;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
        .tab-button:hover {
          background-color: oklch(27.4% 0.006 286.033);
          color: oklch(98.5% 0 0);
        }
        .tab-button.active {
          background-color: oklch(53.2% 0.157 131.589);
          color: #fff;
        }
      </style>
      <div class="tabs-container">
        <div class="tabs">
          <button class="tab-button active" data-tab="active">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-notepad-text-icon lucide-notepad-text">
              <path d="M8 2v4" />
              <path d="M12 2v4" />
              <path d="M16 2v4" />
              <rect width="16" height="18" x="4" y="4" rx="2" />
              <path d="M8 10h6" />
              <path d="M8 14h8" />
              <path d="M8 18h5" />
            </svg>
            Active Notes
          </button>
          <button class="tab-button" data-tab="archived">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-icon lucide-archive">
              <rect width="20" height="5" x="2" y="3" rx="1" />
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
              <path d="M10 12h4" />
            </svg>
            Archived Notes
          </button>
        </div>
      </div>
    `
  }
}

customElements.define('note-tabs', NoteTabs)
