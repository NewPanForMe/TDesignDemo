<template>
  <t-card bordered style="margin-right: 5px">
    <t-tree
      :data="items"
      activable
      hover
      transition
      line
      @click="handleClick"
    />
  </t-card>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, reactive, h } from "vue";
//获得全局变量
const instance = getCurrentInstance().appContext.config.globalProperties;
const items = ref([]);
var prop = defineProps({
  listUrl: String,
});
const emit = defineEmits(["click"]);
const load = () => {
  return items;
};
onMounted(() => {
  items.value = [];
  GetTreeList();
});
const GetTreeList = () => {
  items.value = [];
  instance.$http.post(prop.listUrl).then((resp) => {
    if (resp.success) {
      items.value = resp.result;
    }
  });
};

const handleClick = (e) => {
  emit("click", e.node.value);
};

//暴露属性
defineExpose({
  GetTreeList,
});
</script>
