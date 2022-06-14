import  Main from "@/pages/Main"
import  CommentPage from "@/pages/CommentPage"
import  About from "@/pages/About"
import  CommentDetail from "@/pages/CommentDetail"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/comment',
        component: CommentPage
    },
    {
        path: '/comment/:id',
        component: CommentDetail
    },
    {
        path: '/about',
        component: About
    }
   
]


const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router;