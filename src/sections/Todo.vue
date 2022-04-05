<template>
    <div>
        <div class="bg-primary mb-3">
            <b-container>
                <b-row>
                    <b-col cols="12" class="pt-3">
                        <b-row>
                            <b-col cols="4">
                            <h5>Title</h5>
                            </b-col>
                            <b-col cols="5">
                                Content
                            </b-col>
                            <b-col cols="1" class="text-right"> 
                                Order
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <b-container>
            <b-row>
                <b-col cols="12" v-for="(todo , key) in todos" :key="key">
                    <b-form>
                        <b-row>
                            <b-col cols="4">
                                <span v-if="editModel.id !== todo.id">{{todo.title}} {{todo.id}}</span>
                                <b-form-input   v-if="editModel.id === todo.id" 
                                                v-model="editModel.title" 
                                                placeholder="Enter title"/>
                            </b-col>
                            <b-col cols="5">
                                <span v-if="editModel.id !== todo.id">{{todo.content}}</span>
                                <b-form-textarea   id="textarea"
                                                    v-if="editModel.id === todo.id"
                                                    v-model="editModel.content"
                                                    placeholder="Enter something..."
                                                    rows="0"
                                                    max-rows="0"/>
                            </b-col>
                            <b-col cols="1" class="text-right"> 
                                {{key}}
                            </b-col>
                            <b-col cols="1" class="text-right text-green"> 
                                <b-button   @click="uppdateTodo(editModel.title, editModel.content, editModel.id)"
                                            v-if="editModel.id === todo.id"
                                            class="btn-plain">
                                    <b-icon icon="check-square" font-scale="1" variant="green"/>
                                </b-button>
                                 <b-button   @click="editModel = false"
                                            v-if="editModel.id === todo.id"
                                            class="btn-plain ml-2">
                                    <b-icon icon="x-circle" font-scale="1" variant="danger"/>
                                </b-button>
                                <b-button   @click="editModel = todo" 
                                            v-if="editModel.id !== todo.id" 
                                            class="btn-plain">
                                    <b-icon icon="pencil-square" font-scale="1" variant="green"/>
                                </b-button>
                            </b-col>
                            <b-col cols="1" class="text-right"> 
                                <b-button @click="deleteTodo(todo.id)" class="btn-plain"><b-icon icon="trash-fill" font-scale="1" variant="danger"/></b-button>
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
                editModel: false,
                title: null,
                text: null
            }
        },
        computed: {
            todos() {
                return this.$store.getters.todos
            },
        },
        props: {

        },
         methods: {
            uppdateTodo(title, content, id) {
                this.$store.dispatch('updateTodos', {title: title, content: content, id: id})
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
    }
</script>
