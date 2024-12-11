const router = [
    {
        path: "/user",
        name: "user",
        meta: { title: "用户" },
        component: () => import('@/views/home/user/index.vue')
    },
    {
        path: "/tableDetail",
        name: "tableDetail",
        meta: { title: "详细表" },
        component: () => import('@/views/home/table/index.vue')
    },
    {
        path: "/module",
        name: "module",
        meta: { title: "模块信息" },
        component: () => import('@/views/home/module/index.vue')
    },
    {
        path: "/modulerole",
        name: "modulerole",
        meta: { title: "模块权限信息" },
        component: () => import('@/views/home/modulerole/index.vue')
    },
    {
        path: "/role",
        name: "role",
        meta: { title: "角色信息" },
        component: () => import('@/views/home/role/index.vue')
    },
    {
        path: "/dept",
        name: "dept",
        meta: { title: "部门信息" },
        component: () => import('@/views/home/dept/index.vue')
    },
    {
        path: "/keyvalue",
        name: "keyvalue",
        meta: { title: "部门信息" },
        component: () => import('@/views/home/keyvalue/index.vue')
    },
];
export default router;


