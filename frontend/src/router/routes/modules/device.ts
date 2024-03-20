import type { RouteRecordRaw } from 'vue-router';
import { DefaultLayout } from '/@/layouts';
import { PageEnum } from '/@/enums';

const route: RouteRecordRaw = {
  path: PageEnum.DEVICES,
  name: 'device-page',
  component: DefaultLayout,
  redirect: PageEnum.DEVICE_LIST,
  children: [
    {
      path: 'list',
      name: 'devices',
      component: () => import('/@/views/device/index.vue'),
    },
  ],
};

export default route;
