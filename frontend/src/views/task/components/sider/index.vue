<template>
  <Sider>
    <div class="sider_status"></div>
    <SiderBtn :context="siderContext" />
  </Sider>
</template>
<script lang="ts" setup>
  import { getImageUrl } from '/@/utils';
  import Sider from '/@/components/sider.vue';
  import SiderBtn from './siderBtn.vue';
  import { IconSrcPath, TasksSiderBtnKey, TasksSiderBtnText, TasksType } from '/@/enums';

  const props = defineProps(['siderType', 'showDetailBtn']);

  interface contextType {
    key: string;
    icon: string;
    text: string;
  }
  const siderContext: Ref<contextType[]> = computed(() => {
    let context: contextType[] = [];
    switch (props.siderType) {
      case TasksType.CURRENT_TASK:
        if (props.showDetailBtn) {
          context = [
            {
              key: TasksSiderBtnKey.CUR_TASK_DETAILS,
              icon: getImageUrl(IconSrcPath.SHOW_DETAILS),
              text: TasksSiderBtnText.DETAILS,
            },
            {
              key: TasksSiderBtnKey.STOP,
              icon: getImageUrl(IconSrcPath.STOP),
              text: TasksSiderBtnText.STOP,
            },
          ];
        } else {
          context = [
            {
              key: TasksSiderBtnKey.STOP,
              icon: getImageUrl(IconSrcPath.STOP),
              text: TasksSiderBtnText.STOP,
            },
          ];
        }
        break;
      case TasksType.TASK_LOG:
        if (props.showDetailBtn) {
          context = [
            {
              key: TasksSiderBtnKey.TASK_LOG_DETAILS,
              icon: getImageUrl(IconSrcPath.SHOW_DETAILS),
              text: TasksSiderBtnText.DETAILS,
            },
            {
              key: TasksSiderBtnKey.DELETE,
              icon: getImageUrl(IconSrcPath.DELETE),
              text: TasksSiderBtnText.DELETE,
            },
          ];
        } else {
          context = [
            {
              key: TasksSiderBtnKey.DELETE,
              icon: getImageUrl(IconSrcPath.DELETE),
              text: TasksSiderBtnText.DELETE,
            },
          ];
        }
        break;
    }
    return context;
  });
</script>
<style lang="less" scoped>
  .sider {
    &_status {
      height: 10rem;
      border-bottom: 1px solid @sider-gap-color;
      padding: 0.5rem 1rem;
    }
  }
</style>
