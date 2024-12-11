const router = [
    {
        path: "/user",
        name: "user",
        meta: { title: "用户" },
        component: () => import('@/views/home/user/index.vue')
    },
    
];
export default router;


