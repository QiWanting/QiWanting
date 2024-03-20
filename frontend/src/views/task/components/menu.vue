<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :inline-collapsed="collapsed"
    class="task_menu"
  >
    <a-menu-item key="1">
      <template #icon>
        <img :src="getImageUrl(IconSrcPath.INSTANT_TASK)" />
      </template>
      <span>{{ TaskMenu.INSTANT_TASKS }}</span>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
  import { IconSrcPath, TaskMenu } from '/@/enums';
  import { getImageUrl } from '/@/utils';

  const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
  });
  watch(
    () => state.openKeys,
    (_val, oldVal) => {
      state.preOpenKeys = oldVal;
    },
  );
  const { collapsed, selectedKeys, openKeys } = toRefs(state);
</script>
<style lang="less" scoped>
  .task_menu {
    background-color: @white-primary;
    width: 12.5rem;
    color: black;
    border-right: 1px solid @task-menu-color;
    padding-top: 0.6rem;
    :deep(.ant-menu) {
      &-item {
        &-selected {
          color: @white-primary;
          background-color: @blue-primary;
        }
        &-selected::after {
          border: none;
        }

        &:hover {
          color: @black-primary;
          background-color: @grey-hover;
        }
        &-selected:hover {
          color: @white-primary;
          background-color: @blue-hover;
        }
      }
    }
  }
</style>
