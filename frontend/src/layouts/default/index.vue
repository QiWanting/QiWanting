<template>
  <layout-header />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
  import LayoutHeader from './header/index.vue';
</script>
<style scoped lang="less"></style>
