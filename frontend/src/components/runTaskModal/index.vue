<template>
  <a-modal
    v-model:visible="popupVisible"
    :title="title"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <component :is="TaskComponent[taskType]" :selectedDeviceNum="selectedDeviceNum" ref="param" />
    <template #footer>
      <a-button key="back" @click="handleCancel">{{ AppContext.CANCEL }}</a-button>
      <a-button key="submit" type="primary" @click="handleRun" :disabled="buttonDisabled">{{
        AppContext.RUN
      }}</a-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
  import { AppContext, InstantTask } from '/@/enums';
  import { TaskComponent, runTask } from '/@/hooks/useTask';
  import { useRouteStore } from '/@/stores';
  import { uploadToS3 } from '/@/api/task';
  const reload = inject('reload') as Function;

  const popupVisible = ref(false);
  const title = computed(() => {
    switch (props.taskType) {
      case InstantTask.FIRMWARE_UPDATE:
        return AppContext.FIRMWARE_UPDATE;
      case InstantTask.SEND_FILE:
        return AppContext.SEND_FILE;
    }
  });
  const param = ref();
  const props = defineProps(['taskType', 'deviceIdList', 'selectedDeviceNum']);

  const buttonDisabled = ref(false);
  watch(
    () => props.taskType,
    () => {
      buttonDisabled.value = props.taskType === InstantTask.SEND_FILE ? true : false;
    },
  );
  watch(
    () => param.value?.runDisabled,
    () => {
      buttonDisabled.value = param.value?.runDisabled;
    },
  );
  const route = useRouteStore();

  const handleCancel = () => {
    popupVisible.value = false;
    if (props.taskType === InstantTask.SEND_FILE) {
      param.value.handleRemove();
    }
  };

  const handleRun = async () => {
    const deviceIdList = props.deviceIdList;
    popupVisible.value = false;
    if (props.taskType === InstantTask.SEND_FILE) {
      const formData = param.value.uploadFileInfo.fileData;
      const uploadUrl = param.value.uploadFileInfo.uploadS3Url;
      await uploadToS3(uploadUrl, formData);
    }
    runTask(props.taskType, param.value.payload, deviceIdList);

    if (route.getCurrent === 'tasks') {
      reload();
    }
    if (props.taskType === InstantTask.SEND_FILE) {
      param.value.handleRemove();
    }
  };

  defineExpose({
    popupVisible,
  });
</script>
