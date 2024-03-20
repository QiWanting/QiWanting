<template>
  <a-layout-header class="header">
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      class="header_menu"
      :items="topBarList"
      id="header_menu"
    >
      <a-menu-item
        :defaultSelectedKeys="current"
        :key="item.key"
        v-for="item in topBarList"
        @click="go(item.path)"
      >
        {{ item.context }}
      </a-menu-item>
    </a-menu>
    <div class="header_right">
      <span class="header_username">username123451234512345@absasdddddddddd</span>
      <a-button class="header_logout" type="primary" @click="handleLogout">{{
        AppContext.LOGOUT
      }}</a-button>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
  import { PageEnum } from '/@/enums';
  import { AppContext } from '/@/enums';
  import { useGo } from '/@/hooks/usePage';
  import { useRouteStore } from '/@/stores';

  const current = ref([useRouteStore().getCurrent]);
  const go = useGo();
  const topBarList = ref([
    {
      key: 'devices',
      context: AppContext.DEVICES,
      path: PageEnum.DEVICES,
    },
    {
      key: 'tasks',
      context: AppContext.TASKS,
      path: PageEnum.TASKS,
    },
  ]);
  const handleLogout = () => {};
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    height: 3.5rem;
    background: @header-bg-color;
    &_menu {
      display: flex;
      width: 100%;
      height: 3.5rem;
      background: @header-bg-color;
      color: @grey-primary;
      line-height: 3.5rem !important;
      font-size: 1.2rem;
      text-align: center;
      border: none;
    }
    :deep(#header_menu .ant-menu) {
      &-item {
        top: 0;
        width: 7rem;
        padding: 0;
        margin: 0 1rem;
        height: 3.5rem;
        &-active {
          color: @white-primary;
        }
        &-active:hover {
          background-color: @header-hvr-color;
        }
        &-selected {
          color: @white-primary;
          border-bottom: 0.2rem solid @blue-primary;
        }
        &-active:hover::after {
          border-bottom: none;
        }
        &-selected::after {
          border-bottom: none;
        }
      }
    }

    &_right {
      display: flex;
      align-items: center;
      margin-right: 5rem;
    }
    &_logout {
      height: 1.6rem;
      width: 3.5rem;
      background-color: @blue-primary;
      border-radius: 0.5rem;
      border-color: @blue-primary;
    }
    &_logout:hover {
      background-color: @red-primary;
      border-color: @red-primary;
    }
    &_username {
      color: @white-primary;
      margin-right: 1rem;
      font-size: 1rem;
      width: 15rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
