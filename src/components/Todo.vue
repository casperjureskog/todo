<template>
    <b-container>
        <b-row>
            <b-col cols="12" class="bg-red"> 
                add todo
                <b-form >
                    <b-form-input   v-model="title" 
                                    placeholder="Enter title"/>
                     <b-form-textarea   id="textarea"
                                        v-model="text"
                                        placeholder="Enter something..."
                                        rows="3"
                                        max-rows="6"/>
                     <b-button @click="onSubmit" type="submit" variant="primary">Submit</b-button>
                </b-form>
            </b-col>
            <b-col>
                <div class="text-primary" @click="onSubmit">sadsa</div>
                {{todos}}
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'ToDo',
        data() {
            return {
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
            onSubmit() {
                console.log('test', this.title, this.text);
                this.$store.dispatch('createTodos', {title: this.title, content: this.text} )
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
