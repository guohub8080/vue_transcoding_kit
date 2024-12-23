import {RouteRecordRaw} from "vue-router"
import transcoding_router from "@/views/transcoding/router"

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "default",
    redirect: "/transcoding"
},
    transcoding_router
    ,

    {
        path: "/:pathMatch(.*)*",
        redirect: "/transcoding"
    },

]

export default routes
