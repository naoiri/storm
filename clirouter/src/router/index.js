import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/fire/:countyId",
        name: "Fire",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (fire.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "fire" */ "../views/Fire.vue"),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router