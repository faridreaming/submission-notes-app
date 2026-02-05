import './style.css'
import './js/components/index.js'
import NotesApi from './js/notes-api.js'

class App {
  static instance = null

  constructor() {
    if (App.instance) return App.instance

    this.initElements()
    this.bindEvents()
    this.displayNotes()

    App.instance = this
  }

  initElements() {
    this.noteListElement = document.querySelector('note-list')
    this.noteFormComponent = document.querySelector('note-form')
  }

  bindEvents() {
    this.noteFormComponent.addEventListener('note-submit', async () => {
      const formElement =
        this.noteFormComponent.shadowRoot.querySelector('form')
      const titleInput = formElement.elements[0]
      const contentInput = formElement.elements[1]

      const newNote = {
        title: titleInput.value,
        body: contentInput.value,
      }

      this.noteFormComponent.isSubmitting = true

      try {
        const result = await NotesApi.addNote(newNote)
        this.showToast(result.message)
        this.displayNotes()
        formElement.reset()
      } catch (err) {
        this.showToast(err.message)
      } finally {
        this.noteFormComponent.isSubmitting = false
      }
    })
  }

  async displayNotes() {
    try {
      const notes = await NotesApi.getAll()

      if (notes.length === 0) {
        this.noteListElement.innerHTML = ''
        this.noteListElement.appendChild(
          this.createAlertMessage('There are no notes to display', 'info'),
        )
        return
      }

      const noteItemElements = notes.map((note) => {
        const noteItemElement = document.createElement('note-item')
        noteItemElement.note = note
        return noteItemElement
      })

      this.noteListElement.innerHTML = ''
      this.noteListElement.append(...noteItemElements)
    } catch (err) {
      this.noteListElement.innerHTML = ''
      this.noteListElement.appendChild(
        this.createAlertMessage(err.message, 'error'),
      )
    }
  }

  createAlertMessage(message, type) {
    const alertMessageElement = document.createElement('alert-message')
    alertMessageElement.setAttribute('message', message)
    alertMessageElement.setAttribute('type', type)
    return alertMessageElement
  }

  showToast(message, duration = 3000) {
    const toastElement = document.createElement('toast-message')
    toastElement.setAttribute('message', message)
    let toastContainer = null

    document.body.appendChild(toastElement)

    requestAnimationFrame(() => {
      toastContainer = document.querySelector('toast-message div')
      toastContainer.style.bottom = '1rem'
      console.log(toastContainer)
    })

    setTimeout(() => {
      toastContainer.style.bottom = '-100%'
      setTimeout(() => {
        if (document.body.contains(toastElement)) {
          toastElement.remove()
        }
      }, 500)
    }, duration)
  }
}

new App()
