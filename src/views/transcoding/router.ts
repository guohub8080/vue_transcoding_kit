export default {
    path: "/transcoding",
    name: "transcoding",
    component: () => import("@/views/transcoding/index.vue"),
    redirect: "/transcoding/base64",
    children: [
        {
            path: "base64",
            component: () => import("@/views/transcoding/views/TransBase64.vue")
        },
        {
            path: "rsa",
            component: () => import("@/views/transcoding/views/TransRSA.vue")
        },
        {
            path: "psw",
            component: () => import("@/views/transcoding/views/RandomPsw.vue")
        }, {
            path: "about",
            component: () => import("@/views/transcoding/views/About.vue")
        },
        {
            path: ":pathMatch(.*)*",
            redirect: "/transcoding/base64"
        },
    ]

}
