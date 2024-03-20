<template>
  <a-modal
    v-model:visible="visible"
    title="Device details"
    @ok="handleOk"
    :mask="false"
    :mask-closable="false"
    class="device_detail"
    width="33rem"
  >
    <div class="detail_body">
      <div class="detail_body_left">
        <a-image
          width="8rem"
          height="8rem"
          :src="info.iconUrl"
          fallback="data:image/png;base64,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"
        />
        <div class="context">
          <p class="context_modename">{{ info.modeName }}</p>
          <p class="context_ip">{{ info.ipAddress }}</p>
          <div class="context_status">
            <icon-check v-if="info.deviceStatus === 'online'" class="icon icon_online" />
            <icon-close v-else-if="info.deviceStatus === 'offline'" class="icon icon_offline" />
            <span>{{ info.deviceStatus }}</span>
          </div>
        </div>
      </div>
      <div class="detail_body_right">
        <a-table
          class="ant-table-striped"
          size="small"
          :columns="columns"
          :loading="loading"
          :pagination="false"
          :data-source="data"
          :row-class-name="customRowClassName"
          @resizeColumn="
            (w, col) => {
              col.width = w;
            }
          "
          :scroll="{ y: '16rem', x: '10rem' }"
        />
      </div>
    </div>
    <template #footer>
      <a-button key="ok" type="primary" @click="handleOk" class="detail_footer_button">OK</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { TableColumnsType } from 'ant-design-vue';
  import { getDeviceDetail } from '/@/api/device';
  import { customRowClassName } from '/@/hooks/index';
  import { ResponseDeviceDetailItem } from '../types';

  const visible = ref<boolean>(false);
  const info = ref<ResponseDeviceDetailItem>({} as ResponseDeviceDetailItem);
  const loading = ref(false);
  const columns = ref<TableColumnsType>([
    {
      title: 'name',
      dataIndex: 'name',
      resizable: true,
      width: 100,
    },
    {
      title: 'value',
      dataIndex: 'value',
      resizable: true,
      width: 200,
    },
  ]);
  const data = computed(() => {
    const temp: { name: string; value: string }[] = [];
    temp.push(
      { name: 'nodeName', value: info.value.nodeName },
      { name: 'serialNumber', value: info.value.serialNumber },
      { name: 'macAddress', value: info.value.macAddress },
      { name: 'location', value: info.value.location },
      { name: 'contact', value: info.value.contact },
      { name: 'firmMainVer', value: info.value.firmMainVer },
      { name: 'firmSubVer', value: info.value.firmSubVer },
    );
    return temp;
  });
  const showModal = async (id: string) => {
    visible.value = true;
    loading.value = true;
    const { deviceInfo } = await getDeviceDetail(id);
    info.value = deviceInfo;
    loading.value = false;
  };

  const handleOk = () => {
    visible.value = false;
  };
  watch(visible, () => {
    if (visible.value === false) {
      info.value = {} as ResponseDeviceDetailItem;
    }
  });
  defineExpose({
    showModal,
  });
</script>
<style lang="less" scoped>
  .device_detail {
    .detail_body {
      display: flex;
      height: 18rem;
      width: 30.6rem;
      &_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0.5rem 1rem 0;
        .context {
          width: 100%;
          margin-top: 1rem;
          &_modename {
            margin-bottom: 0;
            font-size: 0.6rem;
            font-weight: 700;
            width: 11rem;
            white-space: nowrap;
            overflow: hidden;
          }
          &_ip {
            margin-bottom: 0.2rem;
            font-size: 0.6rem;
          }
          &_status {
            display: flex;
            line-height: 1rem;
            height: 1rem;
            .icon {
              width: 1rem;
              height: 1rem;
              margin-right: 0.5rem;
              &_online {
                color: #008a00;
              }
              &_offline {
                color: #b30000;
              }
            }
          }
        }
      }
      &_right {
        width: 20rem;
        border: 0.05rem solid @grey-primary;
        :deep(.ant-table-header) {
          border-bottom: 1px solid @grey-primary;
        }
        :deep(.ant-table.ant-table-small) {
          line-height: 0.6rem;
          td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .detail_footer_button {
      padding: 0;
      height: 1.25rem;
      border-radius: 0.3rem;
      width: 5rem;
      background-color: @white-primary;
      color: @black-primary;
      border-color: @blue-primary;
      border: 0.1rem solid @blue-primary;
    }
    .detail_footer_button:hover {
      background-color: @grey-hover;
      color: @black-primary;
      border-color: @blue-primary;
    }
  }
  .ant-table-striped :deep(.table-striped) td {
    background-color: #f5f7ff;
  }
</style>
