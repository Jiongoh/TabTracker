import VueRouter from "vue-router";
// import the components
import MyRegister from "../components/MyRegister.vue"
import MyLogin from "../components/MyLogin.vue"
import MyHomePage from "../components/MyHomePage.vue"
import MyTab from "../components/MyTab.vue"
import CreateGame from "../components/CreateGame.vue"
import ViewTab from "../components/ViewTab.vue"
import EditTab from "../components/EditTab.vue"
import store from "@/store";

// create and export a router
const router = new VueRouter({
    routes: [
        {
            path: '/MyRegister',
            name: 'MyRegister',
            component: MyRegister
        },
        {
            path: '/MyLogin',
            name: 'MyLogin',
            component: MyLogin
        },
        {
            path: '/MyHomePage',
            name: 'MyHomePage',
            component: MyHomePage
        },
        {
            path: '/MyTab',
            name: 'MyTab',
            component: MyTab
        },
        {
            path: '/CreateGame',
            name: 'CreateGame',
            component: CreateGame
        },
        {
            path: '/MyTab/:tabId',
            name: 'ViewTab',
            component: ViewTab
        },
        {
            path: '/MyTab/:tabId/edit',
            name: 'EditTab',
            component: EditTab
        },
        {
            path: '*',
            redirect: 'MyHomePage'
        }
    ]
})

router.beforeEach((to, _, next) => {
    if (to.name === 'ViewTab') {
        store.dispatch('setHistoryList', to.params.tabId)
    }
    next();
})

export default router;