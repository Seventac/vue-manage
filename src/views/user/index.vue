<template>
  <div class="manage">
    <div v-if="isShow">
      <el-dialog
          :title="operateType === 'add' ? '新增用户' : '更新用户'"
          :visible.sync="isShow"
      >
        <CommonForm
            :formLabel="operateFormLabel"
            :form="operateForm"
            :inline="true"
            ref="form"
        >
        </CommonForm>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow=false">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="mange-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <CommonForm
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>
    <CommonTable
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @changePage="getList()"
        @edit="editUser"
        @del="delUser"
    >
    </CommonTable>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";
import {getUser} from "@/api/data";


export default {
  name: `User`,
  components: {CommonForm, CommonTable},
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sexLabel',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        },
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        });
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        });
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {

      this.$confirm("此操作将会永久删除该组件，是否继续？", "提示", {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http.post("/user/del", {
          params: {id}
        }).then((res) => {
          let index= this.tableData.indexOf(row)
          console.log(index,"index")
          if(index>-1)
          this.tableData.splice(index,1)
          console.log(this.tableData)
          this.$message({
            type: 'success',
            message: res.data.message
          })
          /*列表行不删除原因，重新mock了一份数据将数据补齐了*/
          /*this.getList()*/
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      })
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({data: res}) => {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        });
        this.config.total = res.count
        this.config.loading = false
      });
    },
  },
  created() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.mange-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
