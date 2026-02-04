import './style.css'
import './js/components/index.js'
import Notes from './js/notes.js'

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
    this.noteFormElement.addEventListener('submit', (event) => {
      event.preventDefault()

      const newNote = {
        id: `notes-${Math.random().toString(36).substr(2, 9)}`,
        title: this.noteTitleInput.value,
        body: this.noteContentInput.value,
        createdAt: new Date().toISOString(),
        archived: false,
      }
      console.log(newNote)
      Notes.addNote(newNote)
      this.displayNotes()
      this.noteFormElement.reset()
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

  displayNotes() {
    const notes = Notes.getAll()
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item')
      noteItemElement.note = note
      return noteItemElement
    })

    this.noteListElement.innerHTML = ''
    this.noteListElement.append(...noteItemElements)
  }
}

new App()
