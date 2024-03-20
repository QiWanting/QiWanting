<template>
  <main class="device">
    <div class="device_content">
      <Bar
        @handle-refresh="handleRefresh"
        @handle-change="handleChange"
        @handle-cancel="handleCancel"
      />
      <Table
        :data="deviceData"
        :loading="loading"
        @handle-sider-show="handleSiderShow"
        @get-selected-row-keys="getSelectedRowKeys"
        @get-selected-device-num="getSelectedDeviceNum"
        @get-model-name="getModelName"
      />
    </div>
    <Sider
      v-show="isSiderShow"
      @handle-get-device-status="handleGetDeviceStatus"
      @handle-task-click="handleTaskClick"
    />
    <RunTaskModal
      :taskType="taskType"
      :selectedDeviceNum="selectedDeviceNum"
      ref="popup"
      :deviceIdList="deviceIdList"
    />
  </main>
</template>
<script setup lang="ts">
  import Bar from './components/bar.vue';
  import Sider from './components/sider/index.vue';
  import Table from './components/table.vue';
  import { DeviceItem, ResponseDeviceItem } from './types';
  import { getDeviceList, getDeviceStatus } from '/@/api/device';
  import RunTaskModal from '/@/components/runTaskModal/index.vue';
  import { useFormatDateTime } from './hooks';

  let devices: DeviceItem[] = [];
  const deviceIdList = ref<string[]>([]);

  const searchValue = ref('');
  const deviceData: Ref<DeviceItem[]> = ref([]);
  const loading = ref(true);
  const isSiderShow = ref(false);
  const popup = ref();
  const taskType = ref<TaskType>('');
  const selectedDeviceNum = ref(0);
  const modelName = ref('');

  provide('searchValue', searchValue);
  provide('getModelName', modelName);
  onBeforeMount(async () => {
    loading.value = false;
    const { deviceList } = await getDeviceList().catch(_ => {
      loading.value = true;
    });
    loading.value = true;
    devices = [];
    deviceList.map((device: ResponseDeviceItem) => {
      devices.push({
        key: device.deviceId,
        ...device,
      });
    });
    deviceData.value = devices;
  });

  const handleSiderShow = (show: boolean) => {
    isSiderShow.value = show;
  };

  const handleRefresh = async () => {
    const deviceKeys: string[] = [];
    deviceData.value.map(device => {
      deviceKeys.push(device.key);
    });
    loading.value = false;
    const { deviceList } = await getDeviceStatus(deviceKeys).catch(_ => {
      loading.value = true;
    });
    loading.value = true;
    devices = [];
    deviceList.map((device: ResponseDeviceItem) => {
      devices.push({
        key: device.deviceId,
        ...device,
        lastUpdateTime: useFormatDateTime(device.lastUpdateTime),
      });
    });
    deviceData.value = devices;
  };
  const handleChange = () => {
    const filterVal = String(searchValue.value).trim().toLowerCase();
    if (filterVal) {
      const searchProps = [
        'modeName',
        'deviceStatus',
        'serialNumber',
        'firmMainVer',
        'firmSubVer',
        'nodeName',
        'runningTask',
        'lastUpdateTime',
      ];
      const rest = devices.filter(item =>
        searchProps.some(key => String(item[key]).toLowerCase().indexOf(filterVal) > -1),
      );
      deviceData.value = rest.map(row => {
        const item = Object.assign({}, row);
        return item;
      });
    } else {
      deviceData.value = devices;
    }
  };
  const handleCancel = () => {
    searchValue.value = '';
    deviceData.value = devices;
  };

  const getSelectedRowKeys = (keys: string[]) => {
    deviceIdList.value = keys;
  };

  const handleGetDeviceStatus = async () => {
    loading.value = false;
    let { deviceList } = await getDeviceStatus(deviceIdList.value).catch(_ => {
      loading.value = true;
    });

    deviceData.value.map(device => {
      deviceList = deviceList.filter((item: ResponseDeviceItem) => {
        if (device.key === item.deviceId) {
          device = {
            key: item.deviceId,
            ...item,
          };
        }
        return item.deviceId !== device.key;
      });
    });
    loading.value = true;
  };

  const handleTaskClick = (type: TaskType) => {
    popup.value.popupVisible = true;
    taskType.value = type;
  };

  const getSelectedDeviceNum = (num: number) => {
    selectedDeviceNum.value = num;
  };

  const getModelName = (name: string) => {
    modelName.value = name;
  };
</script>

<style lang="less" scoped>
  .device {
    display: flex;
    flex-direction: row;
    height: 100%;
    &_content {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 8rem);
      flex: 1;
      margin: 0 0.5rem;
      width: calc(100% - 13.5rem);
    }
  }
</style>
