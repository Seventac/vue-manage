<template>
  <vue-editor
      v-model="content"
      useCustomImageHandler
      @image-added="handleImageAdded"
      :editorToolbar="customToolbar"
      style="height:350px"
  ></vue-editor>
</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";

export default {
  name: "CommonEditor",
  components:{
    VueEditor
  },
  data(){
    return{
      content:"<h1>标题</h1>",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    }
  },
  methods:{
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      let type = file.name.split('.')
      if (type.length < 2) {
        return false
      }
      formData.append('file',file)
      formData.append('usr',sessionStorage.getItem('username'))
      const options = {
        method: 'POST',
        data: formData,
        url: 'user-upload',
        headers: {
          'Content-Type':'form-data'
        },
      }
      axios(options).then(res=>{
        this.imageurl = res.data.image
        let url= axios.defaults.baseURL +'/uploads/'+ this.imageurl
        Editor.insertEmbed(cursorLocation, 'image', url)
      })
      //axios.defaults.baseURL这里是方便上传云服务器可以按自己实际设置
      //这里需要上传转码到后台,后台返回url
      // 把获取到的图片url 插入到鼠标所在位置 回显图片
      resetUploader()
    },
  }
}
</script>

<style scoped>

</style>