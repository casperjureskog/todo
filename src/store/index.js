import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: null
    },
    getters: {
        todos: state => {
            return state.todos
        }
    },
    mutations: {
        todos: (state, data) => {
            state.todos = data
        }
    },
    actions: {
        getTodos({ commit }, ) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos`
                axios.get(url,{ header: true } )
                .then((response) => {
                 
                    commit('todos', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        createTodos({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos`
                axios.post(url, data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(commit);
                    reject(error)
                })
            })
        },
        deleteTodos({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos/${data.id}`
                console.log('url', url, data);
                axios.delete(url)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.log(commit);
                        reject(error)
                    })
            })
        },
        updateTodos({ commit },data) {
            return new Promise((resolve, reject) => {
                console.log('url',data);
                let url = `${process.env.VUE_APP_API}users/1/todos/${data.id}`
                axios.put(url, data)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.log(commit);
                        reject(error)
                    })
            })
        },
    }
})