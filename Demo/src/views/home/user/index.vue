<template>
  <div style="margin: 5px; height: calc(100vh-100px)">
    <t-card bordered style="margin-bottom: 5px">
      <HeaderSelect :columns="headColumns" @click="searchClick"  :rowData="rowHeaderData">
      </HeaderSelect>
    </t-card>
    <t-space direction="vertical">
      <t-row>
        <t-col :span="9" :push="3">
          <t-card bordered>
            <t-button theme="primary" @click="onAdd">
              <template #icon><add-icon /></template>
              新建
            </t-button>
            <BaseTable ref="table" @row-dblclick="rowClick" :listUrl="listUrl" :deleteUrl="deleteUrl" :lockUrl="lockUrl"
              :unLockUrl="unLockUrl"></BaseTable>
          </t-card>
        </t-col>
        <t-col :span="3" :pull="9">
          <!--树-->
          <t-card bordered style="margin-right: 5px;">
            <TTree :listUrl="treeUrl" @click="treeClick" ref="tree" />
          </t-card>
        </t-col>
      </t-row>
    </t-space>



  </div>
  <AddDialog ref="add" :on-confirm="onAddSubmit" :columns="columns" :rowData="rowData" :roleUrl="roleUrl"   :deptUrl="deptUrl"> </AddDialog>
  <EditDialog ref="edit" :on-confirm="onEditSubmit" :columns="columns" :rowData="rowData" :roleUrl="roleUrl"   :deptUrl="deptUrl">
  </EditDialog>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive, h } from "vue";
import { AddIcon } from 'tdesign-icons-vue-next';
import BaseTable from "@/components/layout/table.vue";
import AddDialog from "@/components/layout/addDialog.vue";
import EditDialog from "@/components/layout/editDialog.vue";
import HeaderSelect from "@/components/layout/headerSelect.vue";
import TTree from "@/components/layout/tree.vue";

//获得全局变量
const instance = getCurrentInstance().appContext.config.globalProperties;
const rowData = ref({});
let table = ref(null);
let add = ref(null);
let edit = ref(null);
let headColumns = ref([]);
const rowHeaderData = ref({});
let columns = ref([]);
const listUrl = ref(instance.$api.user.getList);
const deleteUrl = ref(instance.$api.user.delete);
const lockUrl = ref(instance.$api.user.lock);
const unLockUrl = ref(instance.$api.user.unLock);
const roleUrl = ref(instance.$api.role.getSelectList);
const addUrl = ref(instance.$api.user.add);
const editUrl = ref(instance.$api.user.edit);
const treeUrl = ref(instance.$api.dept.getTreeNodeList);
const deptUrl = ref(instance.$api.dept.getNotRootModule);
onMounted(() => {
  headColumns.value = [];
  headColumns.value = table.value.tableExp.headerColumns.value
})


const rowClick = (data) => {
  console.log(data)
  if (!table.value.tableExp.isEdit.value && !data.row.isLock && !data.row.isDelete) {
    instance.$message.warning("无权限");
    return;
  }
  if (data.row.isLock || data.row.isDelete) {
    return;
  }
  rowData.value = null;
  rowData.value = data.row;
  columns.value = [];
  table.value.tableExp.editColumns.value.forEach((element) => {
    columns.value.push(element);
  });
  edit.value.openDialog();
};

const onAdd = () => {
  if (!table.value.tableExp.isAdd.value) {
    instance.$message.warning("无权限");
    return;
  }

  if (rowData.value.deptCode==null) {
    instance.$message.warning("请选择左侧部门");
    return;
  }
  
  columns.value = [];
  table.value.tableExp.addColumns.value.forEach((element) => {
    columns.value.push(element);
  });
  add.value.openDialog();
};

const onAddSubmit = ({ validateResult, firstError }) => {
  if (!table.value.tableExp.isAdd.value) {
    instance.$message.warning("无权限");
    return;
  }
  
  var param = rowData.value;
  instance.$http.post(addUrl.value, param).then((resp) => {
    if (resp.success) {
      rowData.value = {};
      instance.$message.success("成功");
      table.value.GetTableList({})
      add.value.closeDialog();
    }
  });
};

const onEditSubmit = ({ validateResult, firstError }) => {

  var param = rowData.value;
  instance.$http.post(editUrl.value, param).then((resp) => {
    if (resp.success) {
      rowData.value = {};
      instance.$message.success("成功");
      table.value.GetTableList({})
      edit.value.closeDialog();
    }
  });
};


const searchClick = (e) => {
  table.value.GetTableList(e);
};
const treeClick = (e) => {
    rowData.value = {};
    rowData.value.deptCode = e;
    table.value.GetTableList({deptCode:e});
  };
  
</script>
