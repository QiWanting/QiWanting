import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default function setupVueComponents() {
  return Components({
    dirs: [],
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: 'types/components.d.ts',
    resolvers: [
      AntDesignVueResolver(),
      IconsResolver({
        prefix: false,
        customCollections: ['icon'],
      }),
    ],
  });
}
