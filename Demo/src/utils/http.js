//通讯组件
import axios from "axios";
import router from "../router/index";
import cookie from "./cookies";
import config from "../config/config";
import { MessagePlugin } from "tdesign-vue-next";
const instance = axios.create({
    baseURL:config.baseUrl
});
//统一设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.get["Content-Type"] = "application/json";
//添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        //判断cookie是否存在
        var token = cookie.getToken();
        if (token) {
            //存在,放入请求头
            config.headers.Authorization = "Bearer " + token.tokenName;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//添加resp拦截器
instance.interceptors.response.use(
    (resp) => {
        //如果返回的结果为true
        if (resp.data.success == true) {
            if (resp.data != null) {
                return resp.data;
            }
        } else {
            MessagePlugin.error(resp.data.result);
        }
        return Promise.reject(resp.data.message);
    },
    (error) => {
        if (error.response.status == "401") {
            MessagePlugin.error("无权限，请先登录");
            router.replace("/");
            cookie.removeToken();
        }
    }
);
export default instance;
