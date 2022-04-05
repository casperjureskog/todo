<template>
  <div id="app">
    <Todo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import '@/styles/main.scss'

import Todo from './components/Todo.vue'

export default {
    name: 'App',
    components: {
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
