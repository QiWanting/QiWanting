import { RouteRecordRaw } from 'vue-router';
import { modulesType } from '/#/routes';
export * from './basic';

const modules: modulesType = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = [];
Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export const asyncRoutes = routeModuleList;
