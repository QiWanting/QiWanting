import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
// import type { RouteModuleList } from '/@/router/routes/typings';

interface RouteState {
  routes: RouteRecordRaw[];
  current: 'tasks' | 'devices' | '';
}

export const useRouteStore = defineStore('routes', {
  state: (): RouteState => ({
    routes: [],
    current: '',
  }),
  getters: {
    getRoutes: state => {
      return state.routes;
    },
    getCurrent: state => {
      return state.current;
    },
  },
  actions: {
    appendRoute(route: GetArrayItemType<RouteRecordRaw[]> | RouteRecordRaw[]): void {
      if (Array.isArray(route)) {
        this.routes.push(...route);
      } else {
        this.routes.push(route);
      }
    },
    updateCurrent(newCurrent) {
      this.current = newCurrent;
    },
  },
});
