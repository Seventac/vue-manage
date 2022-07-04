<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
      <el-input
          v-if="item.type === 'input'"
          :placeholder="'请输入'+item.label"
          v-model="forms[item.model]"
      >

      </el-input>

      <el-switch v-if="item.type === 'switch'" v-model="forms[item.model]">

      </el-switch>
      <el-date-picker
          v-if="item.type==='date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="forms[item.model]"
      >
      </el-date-picker>
      <el-select
          v-if="item.type==='select'"
          placeholder="请选择"
          v-model="forms[item.model]"
      >
        <el-option v-for="item in item.opts"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: "CommonForm",
  props: {
    formLabel: Array,
    form: {
      type: Object,
      required: true
    },
    inline: Boolean
  },
  data() {
    return {
      forms: this.form
    }
  },

  watch: {
    form: {
      deep: true,
      handler(newValue, oldValue) {

        if (newValue!==oldValue) {
          //将新值赋值到data中
          this.forms = newValue;
        }else{
          this.forms=oldValue;
        }
      }
    }
  }
}
</script>

<style scoped>

</style>