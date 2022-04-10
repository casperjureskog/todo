<template>
  <div id="app">
    <Header @search="setSearch"/>
    <Todo :search="search"/>
  </div>
</template>

<script>
import '@/styles/main.scss'
import Header from './components/Header.vue'
import Todo from './sections/Todo.vue'
export default {
    name: 'App',
    data() {
        return {
            search: null
        }
    },
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
        setSearch(search) {
            this.search = search
        }
    },
    mounted() {
        this.getTodos()
    }
}
</script>
