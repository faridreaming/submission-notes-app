class NotesApi {
  static #baseUrl = 'https://notes-api.dicoding.dev/v2'
  static async getAll() {
    try {
      const response = await fetch(`${this.#baseUrl}/notes`)

      if (!response.ok) {
        throw new Error('Something went wrong with the request')
      }

      const responseJson = await response.json()

      if (responseJson.data && responseJson.length > 0) {
        return responseJson.data
      } else {
        throw new Error('Notes list is empty')
      }
    } catch (err) {
      throw err
    }
  }
}

export default NotesApi
