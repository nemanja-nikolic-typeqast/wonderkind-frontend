import { httpClient } from './client'

export const getAllAuthors = async () => {
  return await httpClient.get(process.env.VUE_APP_API_URL + "/authors-with-book-count")
      .then(response => response.data)
}

export const createAuthor = async (data) => {
  return await httpClient.post(process.env.VUE_APP_API_URL + "/authors", data)
      .then(response => response.data);
}

export const updateAuthor = async (data) => {
  return await httpClient.put(process.env.VUE_APP_API_URL + "/authors", data)
      .then(response => response.data);
}

export const deleteAuthor = async (data) => {
  return await httpClient.delete(process.env.VUE_APP_API_URL + "/authors?id="+data)
      .then(response => response.data);
}
