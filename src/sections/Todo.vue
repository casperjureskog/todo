<template>
    <div>
        <b-container v-if="resultQuery">
            <b-card no-body>
                <b-tabs pills card vertical class="p-0" v-model="tabIndex">
                    <b-tab v-for="(todo , key) in resultQuery" :key="key">
                        <template #title>
                            <h5 class="p-2 text-uppercase text-ellipsis" :class="action(todo.do_date) === 'PAST'? 'text-gray' : ''">{{todo.title}}</h5>
                            <p class=" px-2 small-date text-gray mb-0 d-inline">{{$moment.utc(todo.do_date ).format('YYYY:MM:DD-HH:mm:ss')}}</p>
                            <p class="d-inline" :class="action(todo.do_date) === 'PAST'? 'text-danger' : 'text-green'">{{action(todo.do_date)}}</p>
                            <div class="d-lg-none bg-dark p-3 pb-5" v-if="tabIndex === key">
                                <Content :todo="todo" v-if="tabIndex === key"/>
                            </div>
                        </template>
                        <p class="d-none d-lg-block">
                            <Content :todo="todo" @toast="toastEmit"/>
                        </p>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-container>
        <b-row v-else class="vh-100 d-flex flex-wrap align-content-center"> 
            <b-col  cols="12" class="text-center ">
                <b-icon icon="three-dots" animation="cylon" font-scale="8" variant="primary"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import Content from '../components/Content.vue'
    export default {
        name: 'ToDo',
        data() {
            return {
                today: new Date(),
                tabIndex: 1,
                editModel: false,
                title: null,
                text: null
            }
        },
        components: {
            Content
        },
        props: {
             search: [String, Number],
        },
        computed: {
            todos() {
                return this.$store.getters.todos
            },
            resultQuery() {
                if (this.search && this.todos) {
                    return this.todos.filter(item => {
                        return this.search
                        .toLowerCase()
                        .split(" ")
                        .every(v => item.title.toLowerCase().includes(v));
                    });
                } else {
                    return this.todos;
                }
            }

        },
         methods: {
            toastEmit(type, title, text) {
                this.$emit('toast', type, title, text)
            },
            action(date) {
                if (this.$moment(date).isSame(this.today, 'day')) {
                    return 'TODAY'
                } else if (this.$moment(date).isBefore(this.today, 'day')) {
                    return 'PAST'
                }

            }
        },
    }
</script>
