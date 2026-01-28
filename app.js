import './js/components/index.js'

class App {
  static instance = null

  constructor() {
    if (App.instance) return App.instance
    App.instance = this
  }
}

new App()
