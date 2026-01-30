import './js/components/index.js'
import Notes from './js/notes.js'

class App {
  static instance = null

  constructor() {
    if (App.instance) return App.instance

    this.initElements()
    this.displayNotes()

    App.instance = this
  }

  initElements() {
    this.noteListElement = document.querySelector('note-list')
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
