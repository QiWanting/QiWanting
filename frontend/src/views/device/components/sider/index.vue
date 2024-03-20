<template>
  <Sider>
    <div class="sider_button sider_top" @click="$emit('handleGetDeviceStatus')">
      <img class="sider_button_icon" :src="getImageUrl(IconSrcPath.REFRESH_STATUS)" />
      <span class="sider_button_text">{{ AppContext.GET_DEVICE_STATUS }}</span>
    </div>
    <div class="sub_title">{{ AppContext.INSTANT_TASKS }}</div>
    <div v-for="task in tasks" class="sider_button" @click="$emit('handleTaskClick', task.type)">
      <img class="sider_button_icon" :src="task.iconSrc" />
      <span class="sider_button_text">{{ task.text }}</span>
    </div>
  </Sider>
</template>

<script setup lang="ts">
  import { AppContext, IconSrcPath, InstantTask } from '/@/enums';
  import { getImageUrl } from '/@/utils';
  import Sider from '/@/components/sider.vue';
  const tasks = [
    {
      text: AppContext.FIRMWARE_UPDATE,
      iconSrc: getImageUrl(IconSrcPath.FIRMWARE_UPDATE),
      type: InstantTask.FIRMWARE_UPDATE,
    },
    {
      text: AppContext.SEND_FILE,
      iconSrc: getImageUrl(IconSrcPath.SEND_FILE),
      type: InstantTask.SEND_FILE,
    },
  ];
  defineEmits(['handleGetDeviceStatus', 'handleTaskClick']);
</script>
<style lang="less" scoped>
  .sider_top {
    margin-top: 1rem;
  }
</style>
