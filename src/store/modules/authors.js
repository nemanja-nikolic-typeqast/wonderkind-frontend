import {
    getAllAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from '@/api/authors'

export default {
    namespaced: true,
    mutations: {

    },
    actions: {
        async getAllAuthors () {
            return getAllAuthors()
        },
        async createAuthor(state, item){
            return createAuthor(item)
        },
        async updateAuthor(state, item){
            return updateAuthor(item)
        },
        async deleteAuthor(state, item){
            return deleteAuthor(item)
        },
    },
    getters: {
    }
}
