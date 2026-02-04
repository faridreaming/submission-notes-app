import './style.css'
import './js/components/index.js'
import Notes from './js/notes.js'
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
    this.noteFormElement = document
      .querySelector('note-form')
      .shadowRoot.querySelector('form')
    this.noteTitleInput = this.noteFormElement.elements[0]
    this.noteContentInput = this.noteFormElement.elements[1]
  }

  bindEvents() {
    this.noteFormElement.addEventListener('submit', async (event) => {
      event.preventDefault()

      const newNote = {
        title: this.noteTitleInput.value,
        body: this.noteContentInput.value,
      }

      try {
        const result = await NotesApi.addNote(newNote)
        alert(result.message)
        this.displayNotes()
        this.noteFormElement.reset()
      } catch (err) {
        alert(err.message)
      }
    })

    const customValidationTitleHandler = (event) => {
      const target = event.target
      target.setCustomValidity('')

      if (target.validity.valueMissing) {
        target.setCustomValidity('Judul wajib diisi.')
      }
    }

    const customValidationContentHandler = (event) => {
      const target = event.target
      target.setCustomValidity('')

      if (target.validity.valueMissing) {
        target.setCustomValidity('Isi catatan tidak boleh kosong.')
      } else if (target.validity.tooShort) {
        target.setCustomValidity(
          `Isi catatan minimal ${target.minLength} karakter.`,
        )
      }
    }

    const showErrorMessage = (event) => {
      const isValid = event.target.validity.valid
      const errorMessage = event.target.validationMessage

      const connectedValidationEl =
        event.target.nextElementSibling.nextElementSibling

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage
        connectedValidationEl.style.display = 'block'
      } else {
        connectedValidationEl.innerText = ''
        connectedValidationEl.style.display = 'none'
      }
    }

    this.noteTitleInput.addEventListener('change', customValidationTitleHandler)
    this.noteTitleInput.addEventListener(
      'invalid',
      customValidationTitleHandler,
    )
    this.noteContentInput.addEventListener(
      'change',
      customValidationContentHandler,
    )
    this.noteContentInput.addEventListener(
      'invalid',
      customValidationContentHandler,
    )

    this.noteTitleInput.addEventListener('blur', showErrorMessage)
    this.noteContentInput.addEventListener('blur', showErrorMessage)
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
}

new App()
