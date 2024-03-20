<template>
  <div class="device_bar">
    <a-input
      class="device_bar_search"
      v-model:value="searchValue"
      placeholder="Search"
      @change="$emit('handleChange')"
    >
      <template #addonAfter v-if="searchValue">
        <icon-cancel @click="$emit('handleCancel')" />
      </template>
      <template #addonAfter v-else>
        <icon-search />
      </template>
    </a-input>
    <div class="device_bar_refresh" @click="$emit('handleRefresh')">
      <icon-refresh />
    </div>
  </div>
</template>
<script setup lang="ts">
  defineEmits(['handleRefresh', 'handleChange', 'handleCancel']);

  const searchValue: Ref<string> | undefined = inject('searchValue');
</script>
<style lang="less" scoped>
  .device_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 5rem;
    &_search {
      width: 15rem;
    }
    &_refresh {
      line-height: 0;
      cursor: pointer;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: @key-color;
      }
    }
    &_refresh:hover {
      svg {
        color: rgba(@key-color-rgb, 0.5);
      }
    }
  }
</style>
