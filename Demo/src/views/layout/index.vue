<template>
    <t-layout class="container">
        <t-header>
            <t-head-menu value="item1" height="120px">
                <template #logo>
                    <img width="136" class="logo" src="https://www.tencent.com/img/index/menu_logo_hover.png"
                        alt="logo" />
                </template>
                <template #operations>
                    <t-space>
                        <t-button shape="circle" variant="outline" >
                            <template #icon  > <TranslateIcon /></template>
                          </t-button>
                        <t-avatar image="https://tdesign.gtimg.com/site/avatar.jpg" />
                        <t-dropdown :options="options" @click="clickHandler">
                            <t-button theme="default" variant="outline">
                                <template #suffix> <t-icon name="chevron-down" size="16" /></template>
                                {{ currentLoginName }}
                            </t-button>
                        </t-dropdown>
                    </t-space>
                </template>
            </t-head-menu>
        </t-header>
        <t-layout>
            <t-aside style="border-top: 1px solid var(--component-border)">
                <t-menu theme="light" style="margin-right: 50px">
                    <t-submenu :value="menu.label" v-for="menu in menus">
                        <template #icon>
                            <t-icon :name="menu.icon" />
                        </template>
                        <template #title>
                            <span>{{ menu.label }}</span>
                        </template>
                        <t-menu-item :value="child.value" @click="menuChange(child.path)" v-for="child in menu.children"
                            :key="child.value">
                            {{ child.label }}
                        </t-menu-item>
                    </t-submenu>
                </t-menu>
            </t-aside>
            <t-layout>
                <t-content>
                    <div>
                        <router-view></router-view>
                    </div>
                </t-content>
                <t-footer>Copyright @ 2024-{{ new Date().getFullYear() }} HonzGroup. All Rights Reserved</t-footer>
            </t-layout>
        </t-layout>
    </t-layout>

    <t-dialog :visible="visible" cancelBtn="" confirmBtn="保存" closeBtn="" header="修改密码" closeOnOverlayClick
        closeOnEscKeydown :onCancel="closeDialog" :onEscKeydown="closeDialog" :onOverlayClick="closeDialog"
        :onConfirm="onSubmit">
        <t-form :data="rowData">
            <t-form-item label="旧密码" name="loginPassword">
                <t-input v-model="rowData.loginPassword" type="password"></t-input>
            </t-form-item>
            <t-form-item label="新密码" name="password">
                <t-input v-model="rowData.OneNewpassword" type="password"></t-input>
            </t-form-item>
            <t-form-item label="新密码" name="password">
                <t-input v-model="rowData.TwoNewpassword" type="password"></t-input>
            </t-form-item>
        </t-form>
    </t-dialog>


</template>
<style>
@import url("/src/assets/layout/main.css");
</style>
<script setup>

import { ref, getCurrentInstance, onMounted } from 'vue';
import { AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon,TranslateIcon } from 'tdesign-icons-vue-next';
//获得全局变量
const instance = getCurrentInstance().appContext.config.globalProperties
const visible = ref(false);
const menus = ref([])
const currentLoginName = ref("")
const rowData = ref({})
const editUrl = ref(instance.$api.user.editPassword);

const options = ref([
    { content: "修改密码", value: "editPassword" },
    { content: "退出系统", value: "/", theme: "error", },
])

const closeDialog = () => {
    visible.value = !visible.value;
};
const openDialog = () => {
    visible.value = !visible.value;
};
onMounted(() => {
    changeCollapsed();
    currentLoginName.value = instance.$cookies.getUserName()
})
const changeCollapsed = () => {
    res.value.forEach(element => {
            menus.value.push(element)
        });
}
const res=ref([
  {
    "label": "系统管理",
    "value": "dd1fd1c9-75ea-4593-8a35-7b67a2355c0a",
    "icon": "chart-3d",
    "path": "",
    "children": [
      {
        "label": "用户管理",
        "value": "c2e9549a-fbdb-465e-adbf-45f5e4d97fa9",
        "icon": "member",
        "path": "/user",
        "children": []
      },
    ]
  },
]
)

const menuChange = (path) => {
    instance.$router.push(path);
}

const onSubmit = (e) => {
    rowData.value.userCode = instance.$cookies.getUserCode()
    if (rowData.value.TwoNewpassword !== rowData.value.OneNewpassword) {
        instance.$message.warning("两次密码不一致");
        return;
    }
    var param = rowData.value;
    instance.$http.post(editUrl.value, param).then((resp) => {
        if(resp.success){
            instance.$message.success("密码修改成功，请重新登录")
            instance.$cookies.removeToken()
            instance.$router.push("/");
        }else{
            instance.$message.warning(resp.result)
            return;
        }
    });

};

const getUser = () => {
    var param = { Code: instance.$cookies.getUserCode() }
    instance.$http.post(editUrl.value, param).then((resp) => {
        console.log(resp)
        rowData.value = resp.result
    });
}



const clickHandler = (data) => {
    if (data.value == "editPassword") {
        openDialog()
    }
    if (data.value == "/") {
        instance.$cookies.removeToken()
        instance.$router.push(data.value);
    }
};
</script>