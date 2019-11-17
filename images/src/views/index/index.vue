<template>
<div style="padding: 0 1rem;">
 <el-form style="padding: 1.5rem 0;" :model="form">
    <el-form-item label="选择图片" :label-width="formLabelWidth">
      <el-upload
        ref="upload"
        action="#"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        list-type="picture-card"
        :limit="fileMaxCount"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :before-upload="handleBeforeUpload"
        :on-preview="handlePictureCardPreview">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
          {{ dialogImageUrl }}
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item style="padding: 0 4rem ;text-align: right;">
      <el-button type="primary" @click="uploadFile">立即上传</el-button>
    </el-form-item>
  </el-form>
     <el-table
     v-if="tableData.length !=0"
      :data="tableData"
      style="width: 100%">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
     <el-table-column
        prop="title"
        label="名称"
        width="110">
      </el-table-column>
      <el-table-column
        prop="url"
        label="图片外链">
        <template slot-scope="scope">
           <el-input
                v-model="scope.row.url">
                <i slot="suffix" style="line-height: 40px;font-size:1.5rem"  v-clipboard:success="onCopy" v-clipboard:copy="scope.row.url" class="el-icon-document-copy"></i>
            </el-input>
      </template>
      </el-table-column>
      <el-table-column
        prop="htmlCode"
        label="html代码">
        <template slot-scope="scope">
           <el-input
                v-model="scope.row.htmlCode">
                <i slot="suffix" style="line-height: 40px;font-size:1.5rem"  v-clipboard:success="onCopy" v-clipboard:copy="scope.row.htmlCode" class="el-icon-document-copy"></i>
            </el-input>
      </template>
      </el-table-column>
      <el-table-column
        prop="ubbCode"
        label="UBB代码">
        <template slot-scope="scope">
           <el-input
                v-model="scope.row.ubbCode">
                <i slot="suffix" style="line-height: 40px;font-size:1.5rem" v-clipboard:success="onCopy" v-clipboard:copy="scope.row.ubbCode" class="el-icon-document-copy"></i>
            </el-input>
      </template>
      </el-table-column>
      <el-table-column
        prop="markCode"
        label="MarkCode代码">
        <template slot-scope="scope">
           <el-input
                v-model="scope.row.markCode">
                <i slot="suffix" style="line-height: 40px;font-size:1.5rem" v-clipboard:success="onCopy" v-clipboard:copy="scope.row.markCode" class="el-icon-document-copy"></i>
            </el-input>
      </template>
      </el-table-column>
     </el-table>
    
</div>
   

   
</template>
<script>
import axios from 'axios';
import { Loading } from 'element-ui';
export default {
    name:'index',
    data(){
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            formLabelWidth: '80px',
            limitNum: 3,
            form: {},
            fileMaxCount:null,
            fileMaxSize:null,
            tableData:[]
        }
    },
    created(){
        this.getImageRestrict()
    },
    methods:{
        async getImageRestrict(){
            const res = await axios.get('/getImageRestrict');
            this.fileMaxCount = res.data.fileMaxCount;
            this.fileMaxSize = res.data.fileMaxSize;
        },
        submitUpload(e){
            console.log(this.$refs.upload.uploadFiles);
            const i = this.$refs.upload.uploadFiles;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleBeforeUpload(file){
            const isType = file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg';
                if(!isType) {
                    this.$notify.warning({
                    title: '警告',
                    message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
                    })
                }
                let size = file.size / 1024 / 1024 < this.fileMaxCount
                if(!size) {
                    this.$notify.warning({
                        title: '警告',
                        message: `图片大小必须小于${this.fileMaxCount}`
                    })
                }
                return isType &&　size
            },
        // 文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.error(`单次最大上传数${this.fileMaxCount}`);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async uploadFile() {
                let type = !0;
                let is_error = 0;
                let formData = new FormData();
                if(!this.$refs.upload.uploadFiles.length){
                    this.$message.error('请选择本地图片!');
                    type = !1;
                }
                this.$refs.upload.uploadFiles.forEach((item,index) => {
                    if(!this.handleBeforeUpload(item.raw))return type = !1,is_error++;
                    formData.append('images',item.raw)
                });
                if(type){
                    let log = Loading.service({fullscreen:true});
                   const r = await axios.post('/uploadImg',formData);
                   if(r){
                       let arr = []
                       r.data.ok.forEach(item=>{
                           arr.push({
                               url: 'http://'+location.host+item.imageUrl,
                               htmlCode: `<img src="http://${location.host+item.imageUrl}" />`,
                               ubbCode:`[img]http://${location.host+item.imageUrl}[/img]`,
                               markCode:`![Markdown](http://${location.host+item.imageUrl})`,
                               title:item.fileName,
                           })
                       })
                       this.tableData = arr;
                       log.close();
                       this.$message({
                        message: `上传成功,本次共${r.data.ok.length}张图片！`,
                        type: 'success'
                    });
                   }
                }
            },
            onCopy(e){
                this.$message({
                    message: `复制成功 ${e.text}`,
                    type: 'success'
                });
            }
        }
}
</script>
<style lang="less" scoped>

</style>