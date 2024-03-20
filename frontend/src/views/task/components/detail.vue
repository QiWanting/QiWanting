<template>
  <a-modal
    width="100%"
    wrap-class-name="full-modal"
    class="task_detail"
    :closable="false"
    v-model:visible="visible"
    transition-name="fade"
  >
    <template #title>
      <div class="task_detail_header">
        <div class="back_icon_box"><IconBack class="back_icon" @click="handleCancel" /></div>
        <div class="title_taxt">{{ title }}</div>
      </div>
    </template>
    <template #footer>
      <a-button
        v-if="!isCurrent && errorIdList.length > 0"
        key="submit"
        type="primary"
        @click="handleRetry"
        class="modal_button"
        >{{ AppContext.RETRY }}</a-button
      >
      <a-button key="back" @click="handleCancel" class="modal_cancel">{{
        AppContext.CANCEL
      }}</a-button>
    </template>
    <div class="detail_body">
      <div class="detail_body_target">
        <p class="detail_table_title">{{ AppContext.TARGET }}</p>
        <a-table
          :columns="detailColumns"
          :data-source="data"
          class="detail_table"
          size="middle"
          :pagination="false"
          :loading="loading ?? false"
          :scroll="{ y: 'calc(100vh - 13.25rem)' }"
          @resizeColumn="
            (w, col) => {
              col.width = w;
            }
          "
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag
                :key="record.targetDeviceTaskStatus"
                :color="setDetailStatusColor(record.targetDeviceTaskStatus)"
                :style="{ color: setDetailTextColor(record.targetDeviceTaskStatus) }"
                class="status_tag"
              >
                {{ transToDetailStatus(record.targetDeviceTaskStatus) }}
              </a-tag>
            </template>
          </template>
        </a-table>
      </div>
      <div class="detail_body_context">
        <div v-if="task.type === InstantTask.FIRMWARE_UPDATE" class="firm_update">
          <a-checkbox :checked="!task.payload.checkOnly" class="update-context" disabled>
            {{ AppContext.UPDATE_FLAG_TEXT }}
          </a-checkbox>
          <p>{{ AppContext.UPDATE_TIPS }}</p>
        </div>
        <div v-else-if="task.type === InstantTask.SEND_FILE" class="send_file">
          <div>{{ AppContext.FILE }}</div>
          <div>
            {{ `${task.payload.fileName}.${task.payload.fileType}` }}
          </div>
        </div>
      </div>
    </div>
    <RunTaskModal
      v-if="!isCurrent && errorIdList.length > 0"
      :taskType="task.type"
      :selectedDeviceNum="errorIdList.length"
      ref="popup"
      :deviceIdList="errorIdList"
    />
  </a-modal>
</template>
<script lang="ts" setup>
  import { getTaskDetail } from '/@/api/task';
  import { TaskTetailTable, AppContext, TaskStatus, InstantTask } from '/@/enums';
  import { setDetailStatusColor, setDetailTextColor, transToDetailStatus } from '../hooks';
  import { DetailLogItem, ResponseDetailLogItem } from '../types';
  import { getAppEnvConfig } from '/@/utils/env';
  import RunTaskModal from '/@/components/runTaskModal/index.vue';
  import { TableColumnsType } from 'ant-design-vue';
  const props = defineProps(['title', 'selectedKey', 'detailVisible', 'isCurrent']);
  const visible = ref<boolean>(false);
  const data = ref<DetailLogItem[]>([]);
  const loading = ref<boolean>(false);
  const popup = ref();

  const detailColumns = ref<TableColumnsType>([
    {
      title: TaskTetailTable.STATUS,
      dataIndex: 'targetDeviceTaskStatus',
      key: 'status',
      width: 200,
      resizable: true,
    },
    {
      title: TaskTetailTable.MODEL_NAME,
      resizable: true,
      width: 200,
      dataIndex: 'modeName',
    },
    {
      title: TaskTetailTable.NODE_NAME,
      resizable: true,
      width: 200,
      dataIndex: 'nodeName',
    },
    {
      title: TaskTetailTable.SERAIL,
      resizable: true,
      width: 200,
      dataIndex: 'serialNumber',
    },
    {
      title: TaskTetailTable.MAIN_FIRM_VERSION,
      resizable: true,
      width: 200,
      dataIndex: 'firmMainVer',
    },
    {
      title: TaskTetailTable.SUB_FIRM_VERSION,
      resizable: true,
      width: 200,
      dataIndex: 'firmSubVer',
    },
  ]);
  const task = reactive<{
    type: TaskType;
    payload: any;
  }>({ type: '', payload: {} });
  const { VITE_TASK_DETAIL_WEBSOCKET } = getAppEnvConfig();

  const ws = useWebSocket(VITE_TASK_DETAIL_WEBSOCKET, {
    immediate: false,
    autoReconnect: {
      delay: 1000,
      retries: 3,
      onFailed() {
        alert('Failed to connect WebSocket after 3 retries');
      },
    },
  });
  const errorIdList = computed(() =>
    data.value.filter(i => i.targetDeviceTaskStatus === TaskStatus.ERROR).map(i => i.key),
  );
  const handleRetry = () => {
    popup.value.popupVisible = true;
  };

  const handleCancel = () => {
    visible.value = false;
  };
  const showModal = () => {
    visible.value = !visible.value;
  };

  watch(visible, async () => {
    if (visible.value === true) {
      loading.value = true;
      const { targetDeviceTask, taskType, taskPayload } = await getTaskDetail(
        props.selectedKey,
      ).catch(_ => {});
      task.type = taskType;
      targetDeviceTask.map((item: ResponseDetailLogItem) => {
        data.value.push({
          key: item.deviceId,
          ...item,
        });
      });
      task.payload = JSON.parse(taskPayload);
      loading.value = false;
      if (props.isCurrent) {
        ws.open();
      }
    } else if (visible.value === false) {
      data.value = [];
      ws.close();
    }
  });
  watch(ws.data, () => {
    const { deviceId, targetDeviceTaskStatus } = JSON.parse(ws.data.value);
    const index = data.value.findIndex(i => i.key === deviceId);
    data.value[index].targetDeviceTaskStatus = targetDeviceTaskStatus;
  });

  defineExpose({ showModal });
</script>
<style lang="less" scoped>
  .modal {
    &_button {
      background-color: @white-primary;
      color: @black-primary;
      width: 11.5rem;
      height: 1.8rem;
      border-radius: 0.2rem;
      border-color: @grey-primary;
    }
    &_button:hover {
      background-color: @grey-hover;
    }

    &_cancel {
      border-color: @grey-primary;
      color: @black-primary;
      width: 7rem;
      height: 1.8rem;
      border-radius: 0.2rem;
      :hover {
        border-color: @grey-primary;
        color: @black-primary;
      }
    }
    &_cancel:hover {
      background-color: @grey-hover;
    }
  }
  :deep(.ant-modal-body) {
    display: flex;
    flex-direction: column;
  }
  .task_detail {
    &_header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 3.5rem;
      color: @white-primary;
      .back_icon_box {
        width: 3rem;
        height: 3rem;
        padding: 0.75rem 0.75rem;
        :hover {
          color: rgba(@white-primary, 0.6);
        }
        .back_icon {
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;
        }
      }
      .title_taxt {
        line-height: 1.5rem;
        margin-left: 0.75rem;
        font-size: 1rem;
      }
    }
    .detail_body {
      display: flex;
      flex-direction: row;
      &_target {
        width: calc(100% - 23rem);
        .detail_table {
          border: 1px solid @grey-primary;
          :deep(.ant-table-header) {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          :deep(td) {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .status_tag {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
      &_context {
        width: 23rem;
        .firm_update {
          padding: 2rem;
        }
        .send_file {
          padding: 2rem;
        }
      }
    }
  }
</style>
