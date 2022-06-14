<template>
    <div>
        <my-modal v-model:show="modalVisible">
            <comment-form @addComment = "createComment" />
        </my-modal>
        <div class="d-flex container">
            <my-input v-model="searchQuery" class="form-control" placeholder="Search..." />
            <my-select class="w-25 m-auto bg-primary text-white" v-model="selectedSort"  :options="selectOptions" />
            <my-button @click="showModal" class="btn btn-outline-primary text-decoration-none">Add</my-button>
        </div>
        <comment-list :comments="sortedAndSearchComments" @remove="removeComment" v-if="!isLoading" />            <!-- v-bind:comments -->
        <div v-else  class="spinner-grow col-md-3 offset-md-6" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>

        <div class="page_wrapper container">
            <div class="btn btn-primary mx-1" :class="{'current-page' : page === pageNum}" v-for="pageNum in totalPage" :key="pageNum.id" @click="changePage">
                {{pageNum}}
            </div>
        </div>
    </div>
</template>

<script>
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
import axios  from 'axios'

export default {
    components: {
        CommentForm,
        CommentList,
    },
    data() {
        return {
            comments: [],
            modalVisible: false,
            isLoading: false,
            selectedSort: "",
            searchQuery: "",
            page: 1,
            limit: 50,
            totalPage: 0,
            selectOptions: [
                {value: "name", name: "filter by name"},
                {value: "email", name: "filter by email"}
            ]
        }
    },
    methods: {
        createComment(comment){
           this.comments.push(comment)
           this.modalVisible = false
        },
        removeComment(comment) {
            this.comments = this.comments.filter(c => c.id !== comment.id);
        },
        showModal() {
            this.modalVisible = true
        },
        changePage() {
            this.page = this.page + 1
            this.fetchComments()
        },
        async fetchComments() {
            try{
                // setTimeout(async () => {
                    this.isLoading = true
                    const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
                        params: {
                            _limit: this.limit,
                            _page: this.page
                        }
                    })
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.comments  = response.data
                // }, 2000)

            }catch(e){
                alert('Something went wrong')
            }finally{
                    this.isLoading = false
            }
        }
       
    },
    mounted() {
        this.fetchComments();
    },
    computed: {
        filteredComments() {
            return [...this.comments].sort((a, b) => {
                if(this.selectedSort === "name") {
                    return a.name.localeCompare(b.name)
                } else if(this.selectedSort === "email") {
                    return a.email.localeCompare(b.email)
                }
            });
        },
        sortedAndSearchComments() {
            return this.filteredComments.filter(comment =>{
                return comment.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                comment.email.toLowerCase().includes(this.searchQuery.toLowerCase());
            })
        }
    },  
    watch: {
        totalpage(newValue) {
            console.log(newValue)
        },
        selectedSort(newValue) {
            console.log(newValue)
        },
        // selectedSort(newValue) {
        //     this.comments.sort((comm1, comm2) => {
        //         if(newValue === "name"){
        //             return comm1.name.localeCompare(comm2.name) 
        //         }else if(newValue === "email"){
        //             return comm1.email.localeCompare(comm2.email) 
        //         }
        //     })
        // },
        modalVisible(newValue) {
            console.log(newValue)
        }
    }
}
</script>


<style>
.current-page{
    background-color: #fff;
    color: #000;
}
</style>