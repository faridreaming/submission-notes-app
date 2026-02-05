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

  static async getArchived() {
    const response = await fetch(`${this.#baseUrl}/notes/archived`)
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal mengambil data arsip')
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

  static async deleteNote(id) {
    const options = {
      method: 'DELETE',
    }

    const response = await fetch(`${this.#baseUrl}/notes/${id}`, options)
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal menghapus catatan')
    }

    return responseJson
  }

  static async archiveNote(id) {
    const options = {
      method: 'POST',
    }

    const response = await fetch(
      `${this.#baseUrl}/notes/${id}/archive`,
      options,
    )
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal mengarsipkan catatan')
    }

    return responseJson
  }

  static async unarchiveNote(id) {
    const options = {
      method: 'POST',
    }

    const response = await fetch(
      `${this.#baseUrl}/notes/${id}/unarchive`,
      options,
    )
    const responseJson = await response.json()

    if (!response.ok) {
      throw new Error(responseJson.message || 'Gagal mengembalikan catatan')
    }

    return responseJson
  }
}

export default NotesApi
