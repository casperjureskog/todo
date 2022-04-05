<template>
  <div id="app">
    <Header/>
    <Todo/>
  </div>
</template>

<script>
import '@/styles/main.scss'

import Header from './components/Header.vue'
import Todo from './sections/Todo.vue'
export default {
    name: 'App',
    components: {
        Header,
        Todo
    },
    methods: {
        getTodos() {
            this.$store.dispatch('getTodos')
            .catch(() => {
                this.error = 'channel'
            })
        },
    },
    mounted() {
        this.getTodos()
    }
}
</script>
