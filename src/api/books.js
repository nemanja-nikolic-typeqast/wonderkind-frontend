import { httpClient } from './client'

export const getAllBooks = async () => {
  return await httpClient.get(process.env.VUE_APP_API_URL + "/books-with-authors")
      .then(response => response.data)
}

export const createBook = async (data) => {
  return await httpClient.post(process.env.VUE_APP_API_URL + "/books", data)
      .then(response => response.data);
}

export const updateBook = async (data) => {
  return await httpClient.put(process.env.VUE_APP_API_URL + "/books", data)
      .then(response => response.data);
}

export const deleteBook = async (data) => {
  return await httpClient.delete(process.env.VUE_APP_API_URL + "/books?id="+data)
      .then(response => response.data);
}

export const rentBook = async (data) => {
  return await httpClient.post(process.env.VUE_APP_API_URL + "/reserve-book", data)
      .then(response => response.data);
}
