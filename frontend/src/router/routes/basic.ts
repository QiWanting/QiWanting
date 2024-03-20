import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '/@/enums';
// import { DefaultLayout } from '/@/layouts';

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    // redirect: EnumPath.HOME,
    redirect: '/device',
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: DefaultLayout,
  //   redirect: '/login',
  //   children: [
  //     {
  //       path: '',
  //       name: 'login-page',
  //       component: () => import('/@/views/login/index.vue'),
  //     },
  //   ],
  // },
  {
    path: PageEnum.OTHER,
    name: 'not-found',
    // component: DefaultLayout,
    children: [
      {
        path: PageEnum.OTHER,
        name: 'not-found-page',
        component: () => import('/@/views/system/notFound.vue'),
      },
    ],
  },
];
