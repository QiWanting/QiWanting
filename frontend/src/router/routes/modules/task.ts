import type { RouteRecordRaw } from 'vue-router';
import { DefaultLayout } from '/@/layouts';
import { PageEnum } from '/@/enums';

const route: RouteRecordRaw = {
  path: PageEnum.TASKS,
  name: 'task-page',
  component: DefaultLayout,
  redirect: PageEnum.TASK_LIST,
  children: [
    {
      path: 'list',
      name: 'tasks',
      component: () => import('/@/views/task/index.vue'),
    },
  ],
};

export default route;
