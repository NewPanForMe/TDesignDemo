<template>
    <hgroup>
        <h1> 鸿 泽 O A </h1>
        <h3>By HonzGroup</h3>
    </hgroup>
    <form>
        <div class="group">
            <input type="text" v-model="formData.username" required="required">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>用户名</label>
        </div>
        <div class="group">
            <input type="password" v-model="formData.password" required=required>
            <span class="highlight"></span>
            <span  class="bar"></span>
            <label>密码</label>
        </div>
        <button type="button" class="button buttonBlue" @click="onSubmit">登录
            <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
    </form>
    <footer><a href="#" target="_blank"><img style="border-radius: 50%;" src="/sign.ico"></a>
        <p>You Gotta Love </p>
    </footer>
</template>
<style>
    @import url("/src/assets/login.css");
</style>

<script setup>
    import { reactive, ref, getCurrentInstance } from "vue";
    //获得全局变量
    const instance = getCurrentInstance().appContext.config.globalProperties

    const formData = ref({
        username: "",
        password: "",
    })
    const loading = ref(false)
    const onSubmit = () => {
        console.log(instance)
        instance.$router.push("/index");
    }
</script>