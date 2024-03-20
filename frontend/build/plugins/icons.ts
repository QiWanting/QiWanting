import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

const LOCAL_ICONS_PATH = 'src/assets/icons';

export default function setupIcons() {
  return Icons({
    compiler: 'vue3',
    customCollections: {
      icon: FileSystemIconLoader(LOCAL_ICONS_PATH, (svg: string) =>
        svg.replace(/^<svg /, '<svg fill="currentColor" '),
      ),
    },
  });
}
