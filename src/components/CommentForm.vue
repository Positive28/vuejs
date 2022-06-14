<template>
    <div>
        <div class="w-75 mx-auto">
            <h3>Add Comments</h3>
            <form @submit.prevent>
                <my-input 
                    v-model="comment.name"
                    placeholder="Enter your Name.." 
                    class="form-control"
                    />
                <my-input 
                    v-model="comment.email" 
                    type="email" 
                    placeholder="Enter your Email.." 
                    class="form-control my-3"
                    />
                <my-input 
                    v-model="comment.body" 
                    type="text" 
                    placeholder="Enter your Content.." 
                    class="form-control"
                    />
                <div class="d-flex flex-row-reverse">
                    <my-button @click="createComment" class="btn btn-primary mt-3">Add Comments</my-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comment: {
                name: '',
                email: '',
                body: ''
            }
        }
    },
    methods: {
        createComment() {
            this.comment.id = Date.now()
            this.$emit('addComment', this.comment)
            this.name = ""
            this.email = ""
            this.body = ""
        }
    },
    watch: {
        comment: {
            handler(newValue) {
                console.log(newValue)
            },
            deep: true
        }
    }
    
}
</script>


<style>

</style>