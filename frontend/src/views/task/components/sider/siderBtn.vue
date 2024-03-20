<template>
  <div class="sider_btns">
    <li
      class="sider_button"
      v-for="item in context"
      :key="item.key"
      @click="handleSiderClick(item.key)"
    >
      <img class="sider_button_icon" :src="item.icon" />
      <span class="sider_button_text">{{ item.text }}</span>
    </li>
    <Modal ref="visible" :modal-type="modalType" />
  </div>
</template>
<script lang="ts" setup>
  import { TasksSiderBtnKey } from '/@/enums';
  import Modal from '/@/components/modal.vue';

  defineProps(['context']);
  const iShowDetail: Function | undefined = inject('showDetail');

  const visible = ref();
  const modalType: Ref<string> = ref<string>('');

  const handleSiderClick = async (type: string) => {
    switch (type) {
      case TasksSiderBtnKey.CUR_TASK_DETAILS:
        if (iShowDetail !== undefined) iShowDetail();
        break;
      case TasksSiderBtnKey.STOP:
        visible.value.showModal();
        modalType.value = TasksSiderBtnKey.STOP;
        break;
      case TasksSiderBtnKey.TASK_LOG_DETAILS:
        if (iShowDetail !== undefined) iShowDetail();
        break;
      case TasksSiderBtnKey.DELETE:
        visible.value.showModal();
        modalType.value = TasksSiderBtnKey.DELETE;
        break;
    }
  };
</script>
<style lang="less" scoped>
  .sider_btns {
    margin-top: 1rem;
  }
</style>
