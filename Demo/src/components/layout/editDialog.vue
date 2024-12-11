<template>
  <t-dialog :visible="visible" cancelBtn="" confirmBtn="保存" closeBtn="" header="修改" closeOnOverlayClick
    closeOnEscKeydown :onCancel="closeDialog" :onEscKeydown="closeDialog" :onOverlayClick="closeDialog"
    :onConfirm="onSubmit">
    <t-form>
      <template v-for="item in prop.columns">
        <!--新增-->
        <t-form-item :label="item.title" :name="item.colKey">
          <template v-if="item.formType === 'input' &&item.textType !== 'email' ">
            <t-input v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]" :type="item.textType" />
          </template>

          <template v-if="item.formType === 'radio'">
            <t-radio-group :default-value="rowData[item.colKey]" v-model="rowData[item.colKey]"
              :onload="onLoadRadio(item.formKey)">
              <template v-for="key in KeyValue">
                <t-radio :value="key.tValue">{{ key.tKey }}</t-radio>
              </template>
            </t-radio-group>
          </template>

          <template v-if="item.textType === 'email'">
            <t-auto-complete v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]" :type="item.textType"
              filterable></t-auto-complete>
          </template>

          <template v-if="item.formType === 'select' && item.textType !== 'true' && item.textType !== 'icon'"">
            <t-select
              v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]" :multiple="item.isMultiSelect"
            :onload="onLoadSelect(item.textType)">
            <t-option label="全选" :check-all="true" />
            <template v-for="keyv in selectOptionSelect[item.textType]">
              <t-option :value="keyv.value" :label="keyv.key"></t-option>
            </template>
            </t-select>
          </template>

          <template v-if="item.formType === 'select' && item.textType === 'true'">
            <t-select v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]">
              <t-option :value="true" label="是"></t-option>
              <t-option :value="false" label="否"></t-option>
            </t-select>
          </template>


          <template v-if="item.formType === 'select' && item.textType === 'icon'">
            <t-select v-model="rowData[item.colKey]" :v-bind:value="rowData[item.colKey]" placeholder="请选择"
              :style="{ width: '400px' }" :popup-props="{ overlayInnerStyle: { width: '400px' } }">
              <t-option v-for="item in iconOptions" :key="item.stem" :value="item.stem" class="overlay-options">
                <div>
                  <t-icon :name="item.stem" />
                </div>
              </t-option>
              <template #valueDisplay><t-icon :name="rowData[item.colKey]" :style="{ marginRight: '8px' }" />{{
                rowData[item.colKey] }}</template>
            </t-select>
          </template>




        </t-form-item>
      </template>
    </t-form>
  </t-dialog>
</template>
<script setup>
import { ref, getCurrentInstance, reactive, h, computed } from "vue";
import { manifest } from 'tdesign-icons-vue-next'

const visible = ref(false);
const instance = getCurrentInstance().appContext.config.globalProperties;
const keyUrl = ref(instance.$api.keyvalue.getKeyValue);
// 获取全部图标的列表
const iconOptions = ref(manifest);
const emit = defineEmits(["onConfirm"]);
const KeyValue = ref([]);
const selectOptions = ref([]);
const selectOptionSelect = ref({});

const closeDialog = () => {
  visible.value = !visible.value;
};
const openDialog = () => {
  visible.value = !visible.value;
};
const onSubmit = (e) => {
  emit("onConfirm", e);
};
var prop = defineProps({
  columns: { type: Array, default: () => [] },
  rowData: {},
  roleUrl: String,
  moduleUrl: String,
  moduleParentUrl: String,
  deptUrl: String,
  typeUrl: String
});

const onLoadRadio = (type) => {
  var param = { name: type };
  instance.$http.post(keyUrl.value, param).then((resp) => {
    if (resp.success) {
      KeyValue.value = [];
      resp.result.forEach((element) => {
        KeyValue.value.push(element);
      });
    }
  });
};

const onLoadSelect = (type) => {
  console.log("onLoadSelect",type)
  var url = ""
  var param = { };
  switch (type) {
    case "role":
      url = prop.roleUrl
      break;
    case "moduleparent":
      url = prop.moduleParentUrl
      break;
    case "module":
      url = prop.moduleUrl
      break;
    case "dept":
      url = prop.deptUrl
      break;
    case "texttype":
      url = prop.typeUrl
      param = { name: type };
      break;
  }
  
  instance.$http.post(url,param).then((resp) => {
    if (resp.success) {
      selectOptions.value = [];
      resp.result.forEach((element) => {
        selectOptions.value.push(element);
      });
      selectOptionSelect.value[type]=selectOptions.value
    }
  });
  console.log("selectOptionSelect",selectOptionSelect)
};


const emailSuffix = ["@qq.com", "@163.com", "@gmail.com"];
const emailOptions = computed(() => {
    const emailPrefix = prop.rowData.mail.split("@")[0];
    if (!emailPrefix) return emailSuffix;
    return emailSuffix.map((suffix) => emailPrefix + suffix);
});

//暴露属性
defineExpose({
  closeDialog,
  openDialog,
});
</script>
