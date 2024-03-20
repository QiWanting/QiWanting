<template>
  <div class="task_table">
    <p class="task_table_title">{{ tableTitle }}</p>
    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      class="ant-table-striped"
      :row-class-name="customRowClassName"
      :pagination="false"
      :row-selection="rowSelection"
      :loading="loading ?? false"
      :scroll="tableScroll"
      @resizeColumn="
        (w, col) => {
          col.width = w;
        }
      "
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'taskStatus'">
          <a-tag
            :key="record.taskStatus"
            :color="setStatusColor(record.taskStatus)"
            :style="{ color: setTextColor(record.taskStatus) }"
            class="status_tag"
          >
            {{ translateStatus(record.taskStatus) }}
          </a-tag>
        </template>
        <template v-if="column.key === 'started'">
          {{ formatToLocalTime(record.started) }}
        </template>
        <template v-if="column.key === 'finished'">
          {{ formatToLocalTime(record.finished) }}
        </template>
        <template v-if="column.key === 'targetDeviceCount'">
          {{ `${record.targetDeviceCount} Devices` }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { setStatusColor, setTextColor, translateStatus } from '../hooks';
  import { formatToLocalTime } from '/@/utils';
  import { customRowClassName } from '/@/hooks/index';

  defineProps(['tableTitle', 'columns', 'data', 'rowSelection', 'loading', 'tableScroll']);
</script>
<style lang="less" scoped>
  .task_table {
    flex: 1;
    display: flex;
    flex-direction: column;
    :deep(.ant-table-striped) {
      flex: 1;
      border: 1px solid @grey-primary;
    }
    &_title {
      margin-bottom: 0;
      font-weight: 500;
    }
    .status_tag {
      width: 3.8rem;
      vertical-align: middle;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
