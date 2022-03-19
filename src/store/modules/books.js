import {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    rentBook
} from '@/api/books'

export default {
    namespaced: true,
    mutations: {

    },
    actions: {
        async getAllBooks () {
            return getAllBooks()
        },
        async createBook(state, item){
            return createBook(item)
        },
        async updateBook(state, item){
            return updateBook(item)
        },
        async deleteBook(state, item){
            return deleteBook(item)
        },
        async rentBook(state, item){
            return rentBook(item)
        },
    },
    getters: {
    }
}
