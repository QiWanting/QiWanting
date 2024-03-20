<template>
  <div class="send_file_container">
    <p>{{ `${AppContext.TARGET} ${selectedDeviceNum} ${AppContext.DEVICES}` }}</p>
    <p>{{ AppContext.CHOOSE_FILE }}</p>
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
      accept=".djf"
      :progress="{}"
      :max-count="1"
    >
      <a-button type="primary" class="upload_button">
        {{ AppContext.SELECT_FILE }}
      </a-button>
    </a-upload>
    <p>{{ AppContext.FILE_NAME_RULE }}</p>
    <p>{{ AppContext.FILE_AMOUNT_RULE }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { AppContext } from '/@/enums/context';
  import type { UploadProps } from 'ant-design-vue';
  import { getUploadIdAndUrl } from '/@/api/task';
  import { computed, ref } from 'vue';

  defineProps(['selectedDeviceNum']);

  const fileList = ref<UploadProps['fileList']>([]);
  const runDisabled = ref(true);
  let uploadFile;
  const fileTypeStr = ref('');
  const fileName = ref('');
  const fileUrlIdStr = ref('');
  const uploadUrl = ref('');

  const modelName = inject<Ref<string>>('getModelName');

  const handleRemove: UploadProps['onRemove'] = () => {
    fileList.value = [];
    runDisabled.value = true;
  };

  const beforeUpload: UploadProps['beforeUpload'] = async file => {
    runDisabled.value = true;
    fileList.value = [];
    fileList.value = [...fileList.value, file];
    const reg = /[\t\r\f\n\s]*/g;
    const removeSpaceModelName = modelName?.value.replace(reg, '') as string;
    const getUploadResponse = await getUploadIdAndUrl(file.name, removeSpaceModelName);
    const fileSplit = file.name.split('.');
    fileTypeStr.value = fileSplit[1];
    fileName.value = fileSplit[0];
    fileUrlIdStr.value = getUploadResponse.uploadId;
    if (getUploadResponse.uploadUrl != 'error') {
      uploadUrl.value = getUploadResponse.uploadUrl;
      runDisabled.value = false;
      uploadFile = fileList.value[0];
      return false;
    }
  };

  const payload = computed(
    (): sendFilePayload => ({
      fileType: fileTypeStr.value,
      fileUrlId: fileUrlIdStr.value,
      fileName: fileName.value,
    }),
  );

  const uploadFileInfo = computed(
    (): uploadFileInfoType => ({
      fileData: uploadFile,
      uploadS3Url: uploadUrl.value,
    }),
  );

  defineExpose({ payload, uploadFileInfo, runDisabled, handleRemove });
</script>
<style lang="less" scoped>
  .upload_button {
    text-align: center;
    width: 100%;
  }
  :deep(.ant-upload.ant-upload-select) {
    display: block;
  }
</style>
