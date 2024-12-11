<template>
    <t-space>
        <template v-for="item in prop.columns">
            <template v-if="item.formType === 'input'">
                <t-input v-model="rowData[item.colKey]"    :placeholder="item.title"  :v-bind:value="rowData[item.colKey]" :type="item.textType" />
            </template>

            <template v-if="item.formType === 'radio'">
                <t-radio-group :default-value="rowData[item.colKey]"    :placeholder="item.title"   v-model="rowData[item.colKey]"
                    :onload="onLoad(item.formKey)">
                    <template v-for="key in KeyValue">
                        <t-radio :value="key.tValue">{{ key.tKey }}</t-radio>
                    </template>
                </t-radio-group>
            </template>

            <template v-if="item.formType === 'email'">
                <t-auto-complete v-model="rowData[item.colKey]"   :placeholder="item.title"  :v-bind:value="rowData[item.colKey]"
                    :options="emailOptions" filterable></t-auto-complete>
            </template>


            <template v-if="item.formType === 'select' && item.textType !== 'true'"">
            <t-select   :placeholder="item.title" 
              v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]" :multiple="item.isMultiSelect"
                :onload="onLoadSelect(item.textType)">
                <t-option label=""  />
                <template v-for="keyv in selectOptions">
                    <t-option :value="keyv.value" :label="keyv.key"></t-option>
                </template>
                </t-select>
            </template>

            <template v-if="item.formType === 'select' && item.textType === 'true'">
                <t-select v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]"   :placeholder="item.title" >
                    <t-option :value="true" label="是"></t-option>
                    <t-option :value="false" label="否"></t-option>
                </t-select>
            </template>
        </template>
       
        <t-button variant="outline"  @click="handleClick" >
                <template #icon> <SearchIcon /></template>
            查询
         </t-button>
    </t-space>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { AddIcon, CloudUploadIcon, SearchIcon, CloudDownloadIcon, DiscountIcon } from 'tdesign-icons-vue-next';
const visible = ref(false);
const instance = getCurrentInstance().appContext.config.globalProperties;
const keyUrl = ref(instance.$api.keyvalue.getKeyValue);
const closeDialog = () => {
    visible.value = !visible.value;
};
const openDialog = () => {
    visible.value = !visible.value;
};
const emit = defineEmits(["click"]);

const handleClick = (e) => {
  emit("click", prop.rowData);
};
const selectOptions = ref([]);
var prop = defineProps({
    columns: { type: Array, default: () => [] },
    rowData: {},
    pdmUrl: String
});

const onLoadSelect = (type) => {
    var url = "";
    if (type == "role") {
        url = prop.roleUrl;
    }
    else if (type == "pdmtable") {
        url = prop.pdmUrl;
    }
    instance.$http.post(url).then((resp) => {
        if (resp.success) {
            selectOptions.value = [];
            resp.result.forEach((element) => {
                selectOptions.value.push(element);
            });
        }
    });
};



//暴露属性
defineExpose({
    closeDialog,
    openDialog,
});
</script>
