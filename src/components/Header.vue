<template>
    <div class="bg-dark">
        <b-container class="position-relative">
            <b-row class=" d-flex justify-content-between p-4 p-md-0">
                <b-col cols="12" md="4" class="text-center text-md-left pt-3">
                    <h1 class="text-primary">To do app</h1>
                </b-col>
                <b-col cols="12" md="auto" class="pt-3 text-right" :class="visible? 'bg-black' : ''">
                        <b-input-group  class="mt-2">
                        <b-form-input v-model="search"  placeholder="search" @change="$emit('search', search)"></b-form-input>
                        <b-input-group-append>
                        <b-button @click="search = null, $emit('search', search)" class="text-white" variant="secondary" >Cansel</b-button>
                        <b-button @click="visible = !visible" size="sm"  class="text-white" variant="primary">Add ToDo</b-button>
                        </b-input-group-append>
                        </b-input-group>
                      
                </b-col>
            </b-row>
            <b-collapse id="add-todo" v-model="visible" class="add-todo bg-black p-3" >
                <b-form>
                    <b-row >
                        <b-col cols="12" class="py-2"> 
                            <b-form-input   v-model="title" 
                                            placeholder="Enter title"/>
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-textarea   id="textarea"
                                                v-model="content"
                                                placeholder="Enter something..."
                                                rows="3"
                                                max-rows="6"/>
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
                            <b-button @click="onSubmit(title, content, date, time)" :disabled="title === null" variant="primary">Submit</b-button>
                        </b-col>
                        <b-col cols="6" class="text-right py-2">
                            <b-button @click="cancelForm()"  variant="primary">Cansel</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-collapse>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'ToDo',
        data() {
            return {
                search: null,
                error: false,
                visible: false,
                title: null,
                content: null,
                date: null,
                time: null
            }
        },
         methods: {
            onSubmit(titleData, contentData, date, time) {
                this.$store.dispatch('createTodos', {title: titleData, content: contentData, do_date: date+':'+time } )
                .then(() =>{
                    this.title = null
                    this.content = null
                    this.visible = false
                    this.date = null
                    this.time = null
                })
                .then(() =>{
                    this.$emit('toast', 'success', 'DONE !', 'To do Created')
                    return  this.$store.dispatch('getTodos')
                })
                .catch(() => {
                   this.$emit('toast', 'danger', 'Warning!', 'To do where not created!')
                })
            },
            cancelForm() {
                this.title = null
                this.content = null
                this.visible = false
                this.date = null
                this.time = null
            }
        },
    }
</script>
