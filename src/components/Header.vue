<template>
    <div class="bg-dark">
        <b-container class="position-relative">
            <b-row class="py-4">
                <b-col cols="10" class="">
                    <h1 class="text-primary">To do app</h1>
                </b-col>
                <b-col cols="2" class="pt-2 d-flex justify-content-end">
                        <b-button @click="visible = !visible" variant="primary">Add ToDo</b-button>
                </b-col>
            </b-row>
            <b-collapse id="add-todo" v-model="visible" class="add-todo bg-black p-3" >
                 <b-form >
                    <b-row >
                        <b-col cols="12" class="pb-2"> 
                           
                                <b-form-input   v-model="title" 
                                                placeholder="Enter title"/>
                        </b-col>
                        <b-col cols="12" class="pb-2">
                                <b-form-textarea   id="textarea"
                                                    v-model="content"
                                                    placeholder="Enter something..."
                                                    rows="3"
                                                    max-rows="6"/>
                        </b-col>
                        <b-col cols="12">
                            <b-button @click="onSubmit(title, content)" variant="primary">Submit</b-button>
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
                error: false,
                visible: false,
                title: null,
                content: null
            }
        },
        computed: {
        
        },
        props: {

        },
         methods: {
            onSubmit(titleData, contentData) {
                this.$store.dispatch('createTodos', {title: titleData, content: contentData} )
                .then(() =>{
                    this.title = null
                    this.content = null
                    this.visible = false
                })
                .then(() =>{
                    return  this.$store.dispatch('getTodos')
                })
                .catch((error) => {
                    this.error = error
                    console.log('error', error);
                })
            },
        },
    }
</script>
