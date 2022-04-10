<template>
  <div id="app">
    <Header @search="setSearch" @toast="toast"/>
    <Todo :search="search" @toast="toast"/>
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
               this.$emit('toast', 'danger', 'Warning!', 'To do where not collected')
            })
        },
        setSearch(search) {
            this.search = search
        },
        toast(variant = null, title, text) {
            this.$bvToast.toast(text, {
                title: title,
                toaster: 'b-toaster-bottom-right',
                variant: variant,
                solid: true,
                // appendToast: append
            })
        }
    },
    mounted() {
        this.getTodos()
    }
}
</script>
