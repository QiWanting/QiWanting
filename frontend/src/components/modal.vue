<template>
  <a-modal
    v-model:visible="visible"
    class="modal"
    @vue:updated="backToTranslate"
    :maskClosable="false"
  >
    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">{{ title }}</div>
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
    <template #footer>
      <a-button key="submit" type="primary" @click="handleOk" class="modal_button">{{
        modalType === TasksSiderBtnKey.STOP ? AppContext.OK : AppContext.DELETE
      }}</a-button>
      <a-button key="back" @click="handleCancel">{{ AppContext.CANCEL }}</a-button>
    </template>
    <div class="modal_content">
      <icon-question class="icon" />
      <p>{{
        modalType === TasksSiderBtnKey.STOP ? AppContext.STOP_CONTEXT : AppContext.DELETE_CONTEXT
      }}</p>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import { CSSProperties } from 'vue';
  import { TasksSiderBtnKey, AppContext } from '/@/enums';

  const props = defineProps(['modalType']);
  const sendStopTask: Function | undefined = inject('sendStopTask');
  const sendDeleteTask: Function | undefined = inject('sendDeleteTask');

  const visible = ref<boolean>(false);
  const title = ref(AppContext.TITILE);
  const modalTitleRef = ref();
  const { x, y, isDragging } = useDraggable(modalTitleRef);
  const startX = ref<number>(0);
  const startY = ref<number>(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  const preTransformX = ref(0);
  const preTransformY = ref(0);
  const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

  const handleOk = () => {
    switch (props.modalType) {
      case TasksSiderBtnKey.STOP:
        if (typeof sendStopTask === 'function') {
          sendStopTask();
        }
        break;
      case TasksSiderBtnKey.DELETE:
        if (typeof sendDeleteTask === 'function') {
          sendDeleteTask();
        }
        break;
    }
    showModal();
  };

  const handleCancel = () => {
    showModal();
  };
  const showModal = () => {
    visible.value = !visible.value;
  };
  const backToTranslate = () => {
    transformStyle.value.transform = 'translate(0, 0)';
  };
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;
      const bodyRect = document.body.getBoundingClientRect();
      const titleRect = modalTitleRef.value.getBoundingClientRect();
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
  });
  watch(isDragging, () => {
    if (!isDragging) {
      startedDrag.value = false;
    }
  });
  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value;
      transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value;
    }
  });
  const transformStyle = computed<CSSProperties>(() => {
    return {
      transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
  });

  defineExpose({ showModal });
</script>
<style lang="less" scoped>
  .modal {
    &_content {
      display: flex;
      p {
        margin-left: 1rem;
      }
      .icon {
        color: @blue-primary;
        width: 2.5rem;
        height: 2.5rem;
      }
    }
    &_button {
      background-color: @white-primary;
      color: @key-color;
      width: 3.5rem;
    }
  }
</style>
