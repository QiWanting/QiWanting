<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 'calc(65rem + 40%)', y: `calc(100vh - 11.25rem)` }"
    :pagination="false"
    @change="onChange"
    :row-selection="rowSelection"
    :loading="!loading"
    @resizeColumn="
      (w, col) => {
        col.width = w;
      }
    "
    :customRow="customClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'deviceStatus'">
        <a-tag
          :key="record.deviceStatus"
          :color="record.deviceStatus === AppContext.ONLINE ? Color.GREEN : Color.RED"
        >
          {{ record.deviceStatus }}
        </a-tag>
      </template>
      <template v-if="column.key === 'lastUpdateTime'">
        {{ formatToLocalTime(record.lastUpdateTime) }}
      </template>
    </template>
  </a-table>
  <Detail ref="detailVisible" />
</template>
<script setup lang="ts">
  import { type TableColumnsType } from 'ant-design-vue';
  import { sortString, formatToLocalTime } from '/@/utils';
  import { useOnlineStatusFilter } from '../hooks';
  import { AppContext, DeviceTable } from '/@/enums';
  import { DeviceItem } from '../types';
  import { Color } from '/@/enums/context';
  import Detail from './detail.vue';
  defineProps(['data', 'loading']);
  const emit = defineEmits([
    'handleSiderShow',
    'getSelectedRowKeys',
    'getSelectedDeviceNum',
    'getModelName',
  ]);

  const detailVisible = ref();
  const columns = ref<TableColumnsType>([
    {
      title: DeviceTable.ONLINE_STATUS,
      dataIndex: 'deviceStatus',
      key: 'deviceStatus',
      width: 200,
      align: 'center',
      resizable: true,
      filters: [
        {
          text: AppContext.ONLINE,
          value: 'online',
        },
        {
          text: AppContext.OFFLINE,
          value: 'offline',
        },
      ],
      onFilter: useOnlineStatusFilter,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.deviceStatus, b.deviceStatus);
        },
      },
    },
    {
      title: DeviceTable.MODEL_NAME,
      dataIndex: 'modeName',
      key: 'modeName',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.modeName, b.modeName);
        },
      },
    },
    {
      title: DeviceTable.SERAIL,
      dataIndex: 'serialNumber',
      key: 'serailNumber',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.serialNumber, b.serialNumber);
        },
      },
    },
    {
      title: DeviceTable.MAIN_FIRM_VERSION,
      dataIndex: 'firmMainVer',
      key: 'firmMainVer',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.firmMainVer, b.firmMainVer);
        },
      },
    },
    {
      title: DeviceTable.SUB_FIRM_VERSION,
      dataIndex: 'firmSubVer',
      key: 'firmSubVer',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.firmSubVer, b.firmSubVer);
        },
      },
    },
    {
      title: DeviceTable.NODE_NAME,
      dataIndex: 'nodeName',
      key: 'nodeName',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.nodeName, b.nodeName);
        },
      },
    },
    {
      title: DeviceTable.RUNNING_TASK,
      dataIndex: 'runningTask',
      key: 'runningTask',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.runningTask, b.runningTask);
        },
      },
    },
    {
      title: DeviceTable.LAST_UPDATE_TIME,
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime',
      resizable: true,
      width: 200,
      sorter: {
        compare: (a: DeviceItem, b: DeviceItem) => {
          return sortString(a.lastUpdateTime, b.lastUpdateTime);
        },
      },
    },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('pagination: ', pagination);
    console.log('filters: ', filters);
    console.log('sorter: ', sorter);
    console.log('extra: ', extra);
  };

  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DeviceItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      emit('getSelectedRowKeys', selectedRowKeys);
      emit('getSelectedDeviceNum', selectedRows.length);
      if (selectedRows.length > 0) {
        emit('getModelName', selectedRows[selectedRows.length - 1].modeName);
      }
      selectedRows.length > 0 ? emit('handleSiderShow', true) : emit('handleSiderShow', false);
    },
    onSelect: (record: DeviceItem, selected: boolean, selectedRows: DeviceItem[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DeviceItem[], changeRows: DeviceItem[]) => {
      console.log(selected, selectedRows, changeRows);
    },
  });

  const customClick = record => {
    return {
      ondblclick: () => {
        detailVisible.value.showModal(record.key);
      },
    };
  };
</script>
<style lang="less" scoped>
  :deep(.ant-table-thead th.ant-table-column-has-sorters) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  :deep(td) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
