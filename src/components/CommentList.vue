<template>
    <div v-if="comments.length > 0">
    <transition-group name="list">
        <comment-item 
            class="w-75 mx-auto comment my-5" 
            v-for="comment in comments"
            :comment="comment" 
            :key="comment.id" 
            @remove="$emit('remove', comment)"
        />
    </transition-group>
        
    </div>
    <div v-else>
        <h2 class="text-center text-danger">We can not found any comments</h2>
    </div>
</template>

<script>
import CommentItem from './CommentItem.vue'

export default {
    components: {
        CommentItem
    },
    props: {
        comments: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scopet>
.comment{
    border: 5px solid #ccc;
    padding: 10px;
    margin: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all .4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.8s ease;
}

</style>