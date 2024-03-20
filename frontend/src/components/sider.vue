<template>
  <aside class="sider">
    <slot></slot>
  </aside>
</template>

<script setup lang="ts"></script>
<style lang="less" scoped>
  .sider {
    background-color: @sider-bg-color;
    flex-direction: column;
    width: 12.5rem;
    :deep(.sub_title) {
      font-size: 0.9rem;
      padding: 0 1rem;
      line-height: 70px;
      font-weight: 700;
    }
    :deep(.sider_button) {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: 2.5rem;
      cursor: pointer;
      font-size: 0.7rem;
      word-break: break-all;
      &_icon {
        margin-right: 0.5rem;
      }
      &_text {
      }
    }
    :deep(.sider_button:hover) {
      background-color: @grey-hover;
    }
  }
</style>
