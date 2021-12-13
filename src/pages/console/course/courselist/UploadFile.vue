<template>
  <el-upload
    class="c-upload-file"
    :class="{ 'beyond-limit': showFileList && tempFileList.length >= limit }"
    ref="upload"
    :action="action"
    :accept="accept"
    :disabled="disabled"
    :multiple="multiple"
    :list-type="listType"
    :file-list="fileList"
    :drag="drag"
    :limit="limit"
    :auto-upload="autoUpload"
    :show-file-list="showFileList"
    :http-request="httpRequest || handleHttpRequest"
    :before-upload="beforeUpload || handleBeforeUpload"
    :before-remove="beforeRemove || handleBeforeRemove"
    :on-error="onError || handleError"
    :on-change="handleChange"
    :on-preview="onPreview"
    :on-success="handleSuccess"
    :on-remove="handleRemove"
    :on-exceed="onExceed || handleExceed"
  >
    <slot></slot>
    <template slot="file" slot-scope="{ file }">
      <slot name="file" :file="file"></slot>
    </template>
    <template slot="tip">
      <slot name="tip"></slot>
    </template>
    <template slot="trigger">
      <slot name="trigger"></slot>
    </template>
  </el-upload>
</template>
<script>
import { uploadeImageOss } from '@/api/public';
export default {
  name: 'uploadFile',
  props: {
    action: {
      type: String,
      default: '/upload'
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    fileList: {
      type: Array,
      default: () => []
    },
    listType: {
      type: String,
      default: 'text'
    },
    drag: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1
    },
    // 按KB算的
    maxSize: {
      type: Number,
      default: 1024 * 1024
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    httpRequest: {
      type: [Function]
    },
    beforeUpload: {
      type: [Function]
    },
    beforeRemove: {
      type: [Function]
    },
    onChange: {
      type: Function
    },
    onPreview: {
      type: Function
    },
    onError: {
      type: Function
    },
    onSuccess: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    // 文件超出个数限制时的钩子
    onExceed: {
      type: Function
    },
    // 文件尺寸出限制时的钩子
    onSizeExceed: {
      type: Function
    },
    // 从哪儿进来的 表示要上传到哪个文件夹
    from: {
      type: String,
      default: 'image'
    },
    // 宽高比，请按照 2:1的格式赋值
    ratio: {
      type: String,
      default: ''
    },
    // 校验图片大小
    size: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      tempFileList: this.fileList
    };
  },
  computed: {},
  methods: {
    convertFileList(field = []) {
      if (!field || !field.length) {
        return [];
      }
      const fields = typeof field === 'string' ? [field] : field;
      return fields.map(url => {
        const startIndex = url.lastIndexOf('/') + 1;
        const name = url.slice(startIndex);
        return { name, url };
      });
    },
    clearFiles() {
      return this.$refs.upload.clearFiles();
    },
    abort() {
      return this.$refs.upload.abort();
    },
    submit() {
      return this.$refs.upload.submit();
    },
    async loadMedia(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const ev = await new Promise(reslove => {
        reader.onload = reslove;
      });

      const type = file.type.split('/')[0];
      let media = null;

      if (type === 'image') {
        media = new Image();
        media.src = ev.target.result;
        await new Promise(reslove => {
          media.onload = reslove;
        });
      }
      if (type === 'audio') {
        media = new Audio();
        media.src = ev.target.result;
      }
      if (type === 'video') {
        media = document.createElement('video');
        media.preload = 'metadata';

        // media.auto = 'metadata';
        media.src = ev.target.result;
        media.play();
        setTimeout(() => {
          media.pause();
        }, 300);
        await new Promise(reslove => {
          media.addEventListener('loadedmetadata', reslove);
          media.onloadeddata = reslove;
          media.onloadedmetadata = reslove;
          media.onerror = reslove;
        });

        console.log(media);
      }

      return media;
    },
    async handleBeforeUpload(file, fileList) {
      const typeName = { image: '图片', video: '视频' }[
        file.type.split('/')[0]
      ];
      if (file.size > this.maxSize) {
        const message = `文件尺寸超出1M`;
        const error = { file, message };
        if (!this.onSizeExceed) {
          this.$message.error(message);
        } else {
          this.onSizeExceed(file, fileList);
        }
        return Promise.reject(error);
      }

      if (!/image/.test(file.type)) {
        return true;
      }
      const img = await this.loadMedia(file);
      // 尺寸
      if (Object.keys(this.size).length) {
        const { width, height } = this.size;
        const condition = img.width === width && img.height === height;
        if (condition) {
          return true;
        }
        const message = `请上传${width}*${height}的${typeName}`;
        const error = { img, message };
        this.$message.error(message);
        return Promise.reject(error);
      }
      // 比例
      if (this.ratio) {
        const [width, height] = this.ratio
          .split(':')
          .map(val => parseInt(val, 10));
        console.log(this.ratio, width, height, img.width, img.height);
        const condition = width / height === img.width / img.height;
        if (condition) {
          return true;
        }
        const message = `${typeName}宽高比必须为${this.ratio}`;
        const error = { img, message };
        this.$message.error(message);
        return Promise.reject(error);
      }
      return true;
    },
    handleExceed(file, fileList) {
      console.log(file, fileList);
      this.$message.error('文件上传个数超出限制');
    },
    handleChange(file, fileList) {
      this.tempFileList = fileList;
      if (this.onChange) {
        this.onChange(file, fileList);
      }
    },
    handleBeforeRemove(file, fileList) {
      console.log(fileList);
    },
    handleRemove(file, fileList) {
      this.tempFileList = fileList;
      if (this.onRemove) {
        this.onRemove(file, fileList, this.index);
      }
    },
    handleError(err, file, fileList) {
      this.tempFileList = fileList;
      if (err && err.message) {
        this.$message.error(err.message);
      }
    },
    handleSuccess(res, file, fileList) {
      if (this.onSuccess) {
        this.onSuccess(res, file, fileList);
      }
    },
    // 方法里要重写
    async handleHttpRequest(options) {
      console.log(options);
      //   try {
      //     // 文件对象传给接口)
      //   //   options.file
      //   //   // 上传进度调这个
      //   //   options.onProgress({ percent: percent * 100 })
      //   //   // 上传成功，改成自己的结构
      //   //   res.res.url = res.res.requestUrls[0].split('?')[0]
      //   //   return res.res
      //   // } catch (error) {
      //   //   return options.onError(error)
      //   }
      const data = new FormData();
      data.append('fileName', options.file);
      const resData = await uploadeImageOss(data, {
        onUploadProgress: progressEvent => {
          options.onProgress({
            percent: (progressEvent.loaded / progressEvent.total) * 100
          });
        }
      });
      console.log(resData);
      return resData.data;
    }
  },
  created() {
    this.tempFileList = this.fileList;
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    fileList: {
      deep: true,
      handler() {
        this.tempFileList = this.fileList;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep.c-upload-file {
  margin: 0 0 0;
  .el-upload {
    margin: 0 0 0;
    box-sizing: border-box;
    &--picture-card {
      margin-bottom: 8px;
    }
    &__tip {
      line-height: 1;
    }
    &-list {
      line-height: 1;
      font-size: 0;
      &__item {
        position: relative;
        line-height: 148px;
        &-status-label {
          line-height: 1;
          vertical-align: top;
        }
        &-thumbnail {
          height: auto;
          vertical-align: middle;
        }
      }
    }
  }
  .el-upload-list__item-actions,
  .el-upload-list__item-preview {
    font-size: 16px;
  }

  &.beyond-limit .el-upload {
    display: none;
  }
}
</style>
