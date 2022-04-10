<template>
    <div>
        <b-container>
            <b-row class="py-3 d-flex justify-content-end">
                <b-col cols="auto">
                    <b-button   @click="editModel = todo" 
                                v-if="editModel.id !== todo.id" 
                                class="btn-plain">
                        <b-icon icon="pencil-square" font-scale="1" variant="green"/>
                    </b-button>
                </b-col>
                    <b-col cols="auto" class="text-right"> 
                    <b-button @click="deleteTodo(todo.id)" v-if="editModel.id !== todo.id"  class="btn-plain"><b-icon icon="trash-fill" font-scale="1" variant="danger"/></b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12" v-if="editModel.id !== todo.id" class="pt-3 text-capat">
                        <h4>{{todo.title}}</h4>
                </b-col>
                <b-col cols="12" v-if="editModel.id !== todo.id" class="py-3 text-capat">
                        {{todo.content}}
                </b-col>
                <b-col cols="12" v-if="editModel.id === todo.id" >
                    <b-form>
                        <b-row>
                            <b-col cols="12" class="py-2">
                                <b-form-input    v-model="editModel.title" 
                                                placeholder="Enter title"/>
                            </b-col>
                            <b-col cols="12" class="py-2">
                                <b-form-textarea   id="textarea"
                                                    v-model="editModel.content"
                                                    placeholder="Enter something..."
                                                    rows="6"/>
                            </b-col>
                            <b-col cols="6" class="py-2">
                                <b-form-input   v-model="date" 
                                                type="date"
                                                placeholder="Do date"/>
                            </b-col>
                            <b-col cols="6" class="py-2">
                                <b-form-input   v-model="time" 
                                                type="time"
                                                placeholder="Do date"/>
                            </b-col>
                            <b-col cols="6" class="py-2">
                                <b-button   @click="uppdateTodo(editModel, date, time)" variant="primary">
                                    Update
                                </b-button>
                            </b-col>
                            <b-col cols="6" class="text-right py-2">
                                <b-button  class="mr-auto"  @click="editModel = false">
                                    Cansel
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                    <hr/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        data() {
            return {
                tabIndex: 1,
                editModel: false,
                title: null,
                text: null,
                date: null,
                time: null,
            }
        },
        computed: {
           
        },
        props: {
             todo: Object,
        },
        methods: {
            uppdateTodo(data, date, time) {
                this.$store.dispatch('updateTodos', {title: data.title, content: data.content, do_date: date+':'+time, id: data.id})
                .then(() =>{
                    return  this.$store.dispatch('getTodos')
                })
                .then(response => {
                    this.editModel = false
                    console.log('rep', response);
                })
                .catch(() => {
                    this.error = 'channel'
                })
            },
            deleteTodo(id) {
                this.$store.dispatch('deleteTodos', {id: id})
                .then(() =>{
                    return  this.$store.dispatch('getTodos')
                })
                .then(response => {
                    console.log('rep', response);
                })
                .catch(() => {
                    this.error = 'channel'
                })
            },
        },
        mounted() {
            if (this.todo && this.todo.do_date) {
                this.date = this.$moment.utc(this.todo.do_date ).format('YYYY-MM-DD')
                this.time = this.$moment.utc(this.todo.do_date ).format('HH:mm:ss')
            }
        }
    }
</script>