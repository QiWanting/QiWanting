<template>
  <main class="task">
    <TaskMenu />
    <div class="task_container">
      <Table
        :columns="curTaskColumns"
        :data="store.getCurrentTask"
        :row-selection="curTaskRowSelection"
        :table-title="AppContext.CURRENT_TASK"
        :loading="loading"
        class="current_task"
        :table-scroll="{ y: 'calc(33vh - 5.25rem)' }"
      />
      <Table
        :columns="taskLogColumns"
        :data="store.getTaskLog"
        :row-selection="taskLogRowSelection"
        :table-title="AppContext.TASK_LOG"
        :loading="loading"
        class="task_log"
        :table-scroll="{ y: 'calc(66vh - 8.75rem)' }"
      />
    </div>
    <Sider v-show="isSiderShow" :siderType="state.selectedType" :showDetailBtn="isShowDetail" />
    <Detail
      ref="visible"
      @show-detail="showDetail"
      :title="state.title"
      :selectedKey="state.curTaskSelectedRowKeys[0] ?? state.taskLogSelectedRowKeys[0]"
      :isCurrent="state.selectedType === TasksType.CURRENT_TASK ? true : false"
    />
  </main>
</template>

<script lang="ts" setup>
  import TaskMenu from './components/menu.vue';
  import Table from './components/table.vue';
  import Sider from './components/sider/index.vue';
  import { CurrentTaskItem, Key, Type } from './types';
  import { AppContext, TaskStatus, TaskTable, TasksType } from '/@/enums';
  import { taskDelete, taskStop } from '/@/api/task';
  import Detail from './components/detail.vue';
  import { useTaskStore } from '/@/stores';
  import { transToDetailTitle } from './hooks';
  import { getAppEnvConfig } from '/@/utils/env';
  import { TableColumnsType } from 'ant-design-vue';

  const isSiderShow = ref(false);
  const loading = ref<boolean>(false);
  const visible = ref();

  const state = reactive<{
    selectedType: Type;
    curTaskSelectedRowKeys: Key[];
    taskLogSelectedRowKeys: Key[];
    title: string;
  }>({
    selectedType: '',
    curTaskSelectedRowKeys: [],
    taskLogSelectedRowKeys: [],
    title: '',
  });
  const curTaskColumns = ref<TableColumnsType>([
    {
      title: TaskTable.TYPE,
      dataIndex: 'taskType',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.STATUS,
      className: 'column_status',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.STARTED,
      dataIndex: 'started',
      key: 'started',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.TARGET,
      dataIndex: 'targetDeviceCount',
      key: 'targetDeviceCount',
      resizable: true,
      width: 200,
    },
  ]);
  const taskLogColumns = ref<TableColumnsType>([
    {
      title: TaskTable.TYPE,
      dataIndex: 'taskType',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.STATUS,
      className: 'column_status',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.STARTED,
      dataIndex: 'started',
      key: 'started',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.FINISHED,
      dataIndex: 'finished',
      key: 'finished',
      resizable: true,
      width: 200,
    },
    {
      title: TaskTable.TARGET,
      dataIndex: 'targetDeviceCount',
      key: 'targetDeviceCount',
      resizable: true,
      width: 200,
    },
  ]);
  const isShowDetail = computed(() =>
    state.curTaskSelectedRowKeys.length > 1 || state.taskLogSelectedRowKeys.length > 1
      ? false
      : true,
  );
  const store = useTaskStore();
  const { VITE_TASK_WEBSOCKET } = getAppEnvConfig();

  const ws = useWebSocket(VITE_TASK_WEBSOCKET, {
    immediate: false,
    autoReconnect: {
      delay: 1000,
      retries: 3,
      onFailed() {
        alert('Failed to connect WebSocket after 3 retries');
      },
    },
  });

  onActivated(async () => {
    loading.value = true;
    await store.initData();
    loading.value = false;
    if (store.getCurrentTask.length > 0) {
      ws.open();
      watch(ws.data, () => {
        const { taskId, taskStatus } = JSON.parse(ws.data.value);
        store.changeStatus(taskId, taskStatus);
      });
    }
  });
  watch(store.getCurrentTask, () => {
    if (store.getCurrentTask.length === 0) {
      ws.close();
    }
  });
  onDeactivated(() => {
    ws.close();
  });
  const curTaskRowSelection = computed(() => {
    return {
      checkStrictly: false,
      selectedRowKeys: state.curTaskSelectedRowKeys,
      onChange: (selectedRowKeys: (string | number)[], selectedRows: CurrentTaskItem[]) => {
        state.curTaskSelectedRowKeys = selectedRowKeys;
        console.log(`curTask: selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        selectedRows.length > 0 ? (isSiderShow.value = true) : (isSiderShow.value = false);

        state.taskLogSelectedRowKeys = [];
        state.selectedType = TasksType.CURRENT_TASK;
        if (selectedRows[0]) state.title = transToDetailTitle(selectedRows[0].taskType);
      },
      onSelect: (record: CurrentTaskItem, selected: boolean, selectedRows: CurrentTaskItem[]) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: CurrentTaskItem[],
        changeRows: CurrentTaskItem[],
      ) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
  });

  const taskLogRowSelection = computed(() => {
    return {
      checkStrictly: false,
      selectedRowKeys: state.taskLogSelectedRowKeys,
      onChange: (selectedRowKeys: (string | number)[], selectedRows: CurrentTaskItem[]) => {
        state.taskLogSelectedRowKeys = selectedRowKeys;
        console.log(`taskLog: selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        selectedRows.length > 0 ? (isSiderShow.value = true) : (isSiderShow.value = false);

        state.curTaskSelectedRowKeys = [];
        state.selectedType = TasksType.TASK_LOG;
        if (selectedRows[0]) state.title = transToDetailTitle(selectedRows[0].taskType);
      },
      onSelect: (record: CurrentTaskItem, selected: boolean, selectedRows: CurrentTaskItem[]) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (
        selected: boolean,
        selectedRows: CurrentTaskItem[],
        changeRows: CurrentTaskItem[],
      ) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
  });
  const sendStopTask = async () => {
    if (state.curTaskSelectedRowKeys.length === 1) {
      await taskStop(state.curTaskSelectedRowKeys[0] as string)
        .then(() => {
          store.changeStatus(state.curTaskSelectedRowKeys[0] as string, TaskStatus.STOP);
        })
        .catch(_ => {});
    } else {
      for (const i of state.curTaskSelectedRowKeys) {
        await taskStop(i as string)
          .then(() => store.changeStatus(i as string, TaskStatus.STOP))
          .catch(_ => {});
      }
    }
    curTaskRowSelection.value.onChange([], []);
  };
  provide('sendStopTask', sendStopTask);

  const sendDeleteTask = async () => {
    await taskDelete(state.taskLogSelectedRowKeys as [])
      .then(() => {
        store.deleteTaskLog(state.taskLogSelectedRowKeys as []);
        taskLogRowSelection.value.onChange([], []);
      })
      .catch(_ => {});
  };
  provide('sendDeleteTask', sendDeleteTask);
  const showDetail = async () => {
    console.log('state.selectedType: ', state.selectedType);
    switch (state.selectedType) {
      case TasksType.CURRENT_TASK:
        console.log('state.curTaskSelectedRowKeys: ', state.curTaskSelectedRowKeys);
        break;
      case TasksType.TASK_LOG:
        console.log('state.taskLogSelectedRowKeys: ', state.taskLogSelectedRowKeys);
        break;
    }

    visible.value.showModal();
  };
  provide('showDetail', showDetail);

  watch(
    () => store.getCurrentTask.length,
    () => {
      if (store.getCurrentTask.length < 1) {
        curTaskRowSelection.value.onChange([], []);
      }
    },
  );
</script>

<style lang="less" scoped>
  .task {
    display: flex;
    flex-direction: row;
    height: 100%;
    &_container {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1rem;
      min-width: 34rem;
      .current_task {
        flex: 1;
      }
      .task_log {
        flex: 2;
        margin-top: 2rem;
      }
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
      :deep(.table-striped) td {
        background-color: @task-table-striped-color;
      }
    }
  }
</style>
