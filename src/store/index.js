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
                    console.log('resp', response);
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
                    console.log('resp', response);
                    commit('todos', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
      
   
    }
})