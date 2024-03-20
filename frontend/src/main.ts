import { createApp } from 'vue';
import { setupStore } from '/@/stores';
import { setupRouter } from '/@/router';
import '/@/styles/index.less';
import App from './App.vue';

const setupApp = () => {
  const app = createApp(App);

  // Configure store with pinia
  setupStore(app);

  // Configure routing
  setupRouter(app);

  app.mount('#app');
};
setupApp();
