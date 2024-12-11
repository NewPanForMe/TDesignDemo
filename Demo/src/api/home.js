const api = {
  apiass: {
    get: "/ApiAss/Get",
  },
  dept: {
    add: "/Dept/Add",
    edit: "/Dept/Edit",
    delete: "/Dept/Delete",
    getList: "/Dept/GetList",
    getTreeNodeList: "/Dept/GetTreeNodeList",
    getNotRootModule: "/Dept/GetNotRootModule",
  },
  health: {
    checkService: "/Health/CheckService",
    getStatus: "/Health/GetStatus",
    test: "/Health/Test",
    testNLog: "/Health/TestNLog",
    upperCase: "/Health/UpperCase",
  },
  keyvalue: {
    add: "/KeyValue/Add",
    edit: "/KeyValue/Edit",
    delete: "/KeyValue/Delete",
    getList: "/KeyValue/GetList",
    getKeyValue: "/KeyValue/GetKeyValue",
    getKeyValueSelect: "/KeyValue/GetKeyValueSelect",
  },
  login: {
    login: "/Login/Login",
  },
  module: {
    add: "/Module/Add",
    edit: "/Module/Edit",
    delete: "/Module/Delete",
    getList: "/Module/GetList",
    getTreeNodeList: "/Module/GetTreeNodeList",
    getParentCodeList: "/Module/GetParentCodeList",
    getNotRootModule: "/Module/GetNotRootModule",
  },
  modulerole: {
    add: "/ModuleRole/Add",
    edit: "/ModuleRole/Edit",
    getList: "/ModuleRole/GetList",
  },
  pdmtable: {
    getPdmTable: "/PdmTable/GetPdmTable",
  },
  pdmtabledetail: {
    edit: "/PdmTableDetail/Edit",
    getList: "/PdmTableDetail/GetList",
    getTextTypeDistinct: "/PdmTableDetail/GetTextTypeDistinct",
  },
  role: {
    add: "/Role/Add",
    edit: "/Role/Edit",
    delete: "/Role/Delete",
    getList: "/Role/GetList",
    getSelectList: "/Role/GetSelectList",
    getSelectTree: "/Role/GetSelectTree",
  },
  user: {
    add: "/User/Add",
    edit: "/User/Edit",
    delete: "/User/Delete",
    lock: "/User/Lock",
    unLock: "/User/UnLock",
    editPassword: "/User/EditPassword",
    getList: "/User/GetList",
    getUserEntity: "/User/GetUserEntity",
  },
};
export default api;