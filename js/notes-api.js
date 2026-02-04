class NotesApi {
  static #baseUrl = 'https://notes-api.dicoding.dev/v2'
  static async getAll() {
    const response = await fetch(`${this.#baseUrl}/notes`)
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal mengambil data')
    }

    return responseJson.data || []
  }

  static async addNote({ title, body }) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }

    const response = await fetch(`${this.#baseUrl}/notes`, options)
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal menambahkan catatan')
    }

    return responseJson
  }
}

export default NotesApi
