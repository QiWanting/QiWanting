# rdm-frontend

## Project Setup

```sh
pnpm install
# 若环境中没有 pnpm 请运行 npx --yes pnpm install
# 其余指令同理 npx --yes pnpm <COMMAND>
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### build

```sh
pnpm run build
```

### format

```sh
pnpm run format
```

### preview

```sh
pnpm run preview
```

### Use unplugin svg icon：

①在`/@/assets/icons`路径下添加svg图标。②使用组件`<icon-${SVG_FILE_NAME}/>`即可，无需导入。如：`<icon-refresh/>`，请注意`${SVG_FILE_NAME}`是相应svg文件名 。
