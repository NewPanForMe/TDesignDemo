<template>
  <t-table
    rowKey="index"
    :pagination="page"
    :columns="columns"
    :data="data"
    :loading="isLoading"
    table-layout="fixed"
    hover
    refreshTable
    @onRowDblclick="handleRowDbClick"
  >
    <div slot="loading" class="t-table--loading-message">
      😊 这里使用插槽自定义加载状态 😊
    </div>
    <template #operation="{ row }">
      <template v-if="isLock">
        <t-button variant="text" theme="warning" @click="onLock(row)">
          {{ row.isLock === false ? "锁定" : "解锁" }}
        </t-button>
      </template>
      <template v-if="isDelete">
        <t-button
          variant="text"
          theme="danger"
          @click="onDelete(row.code)"
          :disabled="row.isDelete"
        >
          {{ row.isDelete === false ? "删除" : "已删除" }}
        </t-button>
      </template>
      <template v-if="isRole">
        <t-button variant="text" theme="success" @click="onRole(row)">
          权限
        </t-button>
      </template>
    </template>
  </t-table>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted, reactive, h } from "vue";
//获得全局变量
const instance = getCurrentInstance().appContext.config.globalProperties;
const columns = ref([]);
const addColumns = ref([]);
const editColumns = ref([]);
const headerColumns = ref([]);
const buttons = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const isDelete = ref(false);
const isLock = ref(false);
const isRole = ref(false);
const data = ref([]);
const page = ref({});
const isLoading = ref(false);
onMounted(() => {
  GetTableList({});
});

const resps = ref({
  page: {
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ["10", "20", "30", "40"],
      total: 2,
    },
    columns: [
      {
        colKey: "workNum",
        title: "工号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "name",
        title: "姓名",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "gender",
        title: "性别",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "age",
        title: "年龄",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "mail",
        title: "邮箱",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "phone",
        title: "手机号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "loginAccount",
        title: "登录账户",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        colKey: "operation",
        title: "操作",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
    ],
    data: [
      {
        id: 1,
        code: "844bacb3-b5d3-4cb0-9cf6-130902947c68",
        workNum: 1,
        name: "管理员",
        gender: "男",
        age: 112,
        mail: "q2eg2j22@qq.com",
        phone: " ",
        loginAccount: "admin",
        loginPassword: "e61fbb1326b5a57e5db090b6d39fd74d",
        loginPasswordSalt: "80b104e5-ce1f-46e0-805f-f7382e0a6f81",
        isLock: false,
        isDelete: false,
        role: [
          "a523f7ac-4e71-4a2d-8684-0e7fcd37e381",
          "961c8d10-62d2-45d2-870d-3829df6ee6e6",
        ],
        deptCode: "3f073773-c742-40f9-9806-656f787e0a1d",
        deptName: "总经理办公室",
      },
      {
        id: 2,
        code: "82f1aec9-f0da-4331-8f6e-f2a5a406f25e",
        workNum: 2,
        name: " 222",
        gender: "男",
        age: 12,
        mail: "adawdaw@163.com",
        phone: " 222",
        loginAccount: " 222",
        loginPassword: "ad2f649816ca7587aeea480c7f9e5ba",
        loginPasswordSalt: "5c34025d-6e3e-40d2-b5ec-dc67e8a03730",
        isLock: false,
        isDelete: false,
        role: ["961c8d10-62d2-45d2-870d-3829df6ee6e6"],
        deptCode: "3f073773-c742-40f9-9806-656f787e0a1d",
        deptName: "总经理办公室",
      },
    ],
    addColumns: [
      {
        formType: "select",
        textType: "role",
        formKey: "",
        isMultiSelect: true,
        colKey: "role",
        title: "角色",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "text",
        formKey: "",
        isMultiSelect: false,
        colKey: "name",
        title: "姓名",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "radio",
        textType: "",
        formKey: "Gender",
        isMultiSelect: false,
        colKey: "gender",
        title: "性别",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "number",
        formKey: "",
        isMultiSelect: false,
        colKey: "age",
        title: "年龄",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "email",
        formKey: "",
        isMultiSelect: false,
        colKey: "mail",
        title: "邮箱",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "tel",
        formKey: "",
        isMultiSelect: false,
        colKey: "phone",
        title: "手机号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "text",
        formKey: "",
        isMultiSelect: false,
        colKey: "loginAccount",
        title: "登录账户",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "password",
        formKey: "",
        isMultiSelect: false,
        colKey: "loginPassword",
        title: "登录密码",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
    ],
    editColumns: [
      {
        formType: "select",
        textType: "role",
        formKey: "",
        isMultiSelect: true,
        colKey: "role",
        title: "角色",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "select",
        textType: "dept",
        formKey: "",
        isMultiSelect: false,
        colKey: "deptCode",
        title: "部门编号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "text",
        formKey: "",
        isMultiSelect: false,
        colKey: "name",
        title: "姓名",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "radio",
        textType: "",
        formKey: "Gender",
        isMultiSelect: false,
        colKey: "gender",
        title: "性别",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "number",
        formKey: "",
        isMultiSelect: false,
        colKey: "age",
        title: "年龄",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "email",
        formKey: "",
        isMultiSelect: false,
        colKey: "mail",
        title: "邮箱",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "tel",
        formKey: "",
        isMultiSelect: false,
        colKey: "phone",
        title: "手机号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
    ],
    headerColumns: [
      {
        formType: "input",
        textType: "number",
        formKey: "",
        isMultiSelect: false,
        colKey: "workNum",
        title: "工号",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
      {
        formType: "input",
        textType: "text",
        formKey: "",
        isMultiSelect: false,
        colKey: "name",
        title: "姓名",
        width: "",
        ellipsis: false,
        render: null,
        cell: null,
        className: null,
      },
    ],
    buttons: [
      {
        buttonName: "新增",
        buttonType: "Add",
      },
      {
        buttonName: "修改",
        buttonType: "Edit",
      },
      {
        buttonName: "删除",
        buttonType: "Delete",
      },
      {
        buttonName: "锁定",
        buttonType: "Lock",
      },
    ],
    isDelete: true,
    isAdd: true,
    isEdit: true,
    isLock: true,
    isRole: false,
  },
});

const GetTableList = (param) => {
  data.value = [];
  page.value = [];
  columns.value = [];
  addColumns.value = [];
  editColumns.value = [];
  headerColumns.value = [];
  isLoading.value = !isLoading.value;
  const resp=resps.value
  page.value = resp.page.pagination;
  resp.page.columns.forEach((element) => {
    element.cell = str_to_func(element.cell);
    element.className = str_to_func(element.className);
    columns.value.push(element);
  });
  resp.page.addColumns.forEach((element) => {
    addColumns.value.push(element);
  });
  resp.page.editColumns.forEach((element) => {
    editColumns.value.push(element);
  });
  resp.page.data.forEach((element) => {
    data.value.push(element);
  });
  resp.page.buttons.forEach((element) => {
    buttons.value.push(element);
  });
  resp.page.headerColumns.forEach((element) => {
    headerColumns.value.push(element);
  });

  isAdd.value = resp.page.isAdd;
  isEdit.value = resp.page.isEdit;
  isDelete.value = resp.page.isDelete;
  isLock.value = resp.page.isLock;
  isRole.value = resp.page.isRole;
  isLoading.value = !isLoading.value;
};

const emit = defineEmits(["onRowDblclick"]);

const handleRowDbClick = (e) => {
  emit("onRowDblclick", e);
};

const str_to_func = (func) => {
  return eval(func);
};

const onRole = (e) => {
  return e;
};

const onLock = (row) => {
  var param = { code: row.code };
  var url = prop.lockUrl;
  if (row.isLock) {
    url = prop.unLockUrl;
  }
  instance.$http.post(url, param).then((resp) => {
    if (resp.success) {
      columns.value = [];
      instance.$message.success("成功");
    }
    GetTableList({});
  });
};
const onDelete = (code) => {
  columns.value = [];
  var param = { code: code };
  instance.$http.post(prop.deleteUrl, param).then((resp) => {
    columns.value = [];
    if (resp.success) {
      instance.$message.success("成功");
    } else {
      instance.$message.error(resp.result);
    }
    GetTableList({});
  });
};

var prop = defineProps({
  listUrl: String,
  deleteUrl: String,
  lockUrl: String,
  unLockUrl: String,
});

var tableExp = {
  columns,
  addColumns,
  editColumns,
  headerColumns,
  buttons,
  isAdd,
  isEdit,
  isDelete,
  isLock,
  isRole,
};
//暴露属性
defineExpose({
  GetTableList,
  tableExp,
});
</script>
