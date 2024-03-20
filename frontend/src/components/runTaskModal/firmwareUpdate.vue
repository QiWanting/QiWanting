<template>
  <p>{{ `${AppContext.TARGET} ${selectedDeviceNum} ${AppContext.DEVICES}` }}</p>
  <a-checkbox v-model:checked="isAutoUpdate" class="update_context">
    {{ AppContext.UPDATE_FLAG_TEXT }}
  </a-checkbox>
  <p>{{ AppContext.UPDATE_TIPS }}</p>
</template>
<script lang="ts" setup>
  import { AppContext } from '/@/enums/context';
  defineProps(['taskType', 'deviceIdList', 'selectedDeviceNum']);
  const isAutoUpdate = ref(false);
  const payload = computed(
    (): firmwareUpdatePayload => ({
      checkOnly: !isAutoUpdate.value,
    }),
  );
  defineExpose({ payload });
</script>
<style lang="less" scoped>
  .update_context {
    color: @blue-primary;
  }
</style>
