import type { App } from 'vue';
import { createPinia } from 'pinia';
import { useRouteStore, useTaskStore } from './modules';
const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store, useRouteStore, useTaskStore };
