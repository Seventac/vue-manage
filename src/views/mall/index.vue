<template>
  <div>
    <div v-if="isShow">
      <el-dialog
          :title="operateType === 'add' ? '新增商品' : '更新商品'"
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
      <el-button type="primary" @click="addGood">+ 新增</el-button>
      <CommonForm
          :formLabel="formLabel"
          :form="searchForm"
          :inline="true"
          ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>
    <hr/>
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
import CommonTable from '@/components/CommonTable'
import CommonForm from '@/components/CommonForm'

export default {
  name: `index`,
  components: {
    CommonTable,
    CommonForm
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: 'date',
          label: '日期',
          type: 'date'
        },
        {
          model: 'username',
          label: '用户名',
          type: 'input'
        },
        {
          model: 'goodname',
          label: '商品名',
          type: 'input'
        },
      ],
      tableData: [],
      tableLabel: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'username',
          label: '用户名'
        },
        {
          prop: 'goodname',
          label: '商品名'
        },
      ],
      operateForm: {
        date: '',
        username: '',
        goodname: ''
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
      config: {
        page: 1,
        total: 200
      }
    }
  },
  methods: {
    confirm(){
      if(this.operateType === 'edit'){
        console.log("对商品数据进行编辑")
        /*先请求接口后将输入传入接口并返回结果*/
        this.$message.warning('暂无修改数据接口,在此处修改数据仅影响前端显示')
      }else{
        console.log("添加商品数据")
        /*向接口内添加数据*/
        this.$message.warning('暂无添加数据接口')
      }
    },
    getMall() {
      this.$http.post('https://mock.apifox.cn/m1/1114741-0-default/mall/getData').then(res => {
        console.log(res, 'res')
        console.log(res.data, '接口返回的mock数据对象')
        this.tableData = res.data.tableData
      })
    },
    addGood() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        date: '',
        username: '',
        goodname: ''
      }
    },
    getList(name = '') {
      this.config.loading = true
      //判断name是否存在，不存在则回到第一页，并获取所有的数据
      name ? (this.config.page = 1) : ''
      this.getMall()

      //如果存在则进行一个列表过滤,在forEach内放置一个过滤函数
      if(name===this.tableData.forEach()){
        console.log(name)
      }
      /*this.$message.warning("暂无带参接口，功能无法实现")*/

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
      }).then(()=>{
        console.log(row)
        this.$message.warning('目前暂无接口删除商品数据')
      })
    }
  },
  computed:{

  },
  mounted() {
    this.getMall()
  }
}
</script>

<style scoped>
.mange-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
