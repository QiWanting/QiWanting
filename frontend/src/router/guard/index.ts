import type { Router } from 'vue-router';
import nProgress from 'nprogress';
import { useRouteStore } from '/@/stores';
import { Modal } from 'ant-design-vue';
// import { createPermissionGuard } from './permissionGuard';

export function setupRouterGuard(router: Router) {
  createProgressGuard(router);
  // createPermissionGuard(router);
}

function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    Modal.destroyAll();
    nProgress.start();
  });

  router.afterEach(() => {
    nProgress.done();
    useRouteStore().updateCurrent(router.currentRoute.value.name);
  });
}
