import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import setupAutoImport from '../plugins/auto-import';
import setupVueComponents from '../plugins/vue-components';
import setupMockServer from '../plugins/mock';
import setupIcons from '../plugins/icons';

export default function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()];

  // unplugin-auto-import
  vitePlugins.push(setupAutoImport());

  // unplugin-vue-components
  vitePlugins.push(setupVueComponents());

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(setupMockServer(isBuild));

  // unplugin-icons
  vitePlugins.push(setupIcons());

  return vitePlugins;
}
