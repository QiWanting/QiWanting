// @ts-check
const { defineConfig } = require('eslint-define-config'); // 通过defineConfig声明配置，让配置可以有语法提示
module.exports = defineConfig({
  root: true, //  eslint会逐级向上查找配置文件，直到文件系统根目录，root: true 则以这份为准，不再往上寻找 eslint 配置
  env: {
    // 启用的脚本执行环境
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser', // 设置解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', //  设置@typescript-eslint/parser作为ts语法解析器
    ecmaVersion: 2020, // ECMAScript 版本
    sourceType: 'module', // 设置项目模块类型为 ECMAScript 模块
    jsxPragma: 'React',
    ecmaFeatures: {
      // 额外支持jsx，tsx语法
      jsx: true,
      tsx: true,
    },
  },
  // plugins: ['@typescript-eslint', 'import'], // 加载第三方插件，可以配置第三方插件支持的所有规则。可省略 eslint-plugin- 前缀
  extends: [
    // 加载默认规则配置。可省略 eslint-config-前缀
    // 注：若不引入 plugins，仅配置此项，则 rules 仅可使用此项配置中的规则
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // 指定文件类型做处理
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    // 自定义规则配置

    // js 详细规则：http://eslint.cn/docs/rules/
    'no-use-before-define': 'off', // 是否禁止定义前使用
    'no-unused-vars': 'off', // must disable the base rule as @typescript-eslint/no-unused-vars can report incorrect errors
    'space-before-function-paren': 'off', // 是否在函数括号必须有空格

    // vue 详细规则：https://eslint.vuejs.org/rules/
    'vue/script-setup-uses-vars': 'error',
    'vue/custom-event-name-casing': 'off', // 是否对自定义事件名称强制使用特定的大小写
    'vue/attributes-order': 'off', // 是否强制属性顺序
    'vue/v-on-event-hyphenation': 'off', // 是否强制自定义事件在模板中用短横线格式使用，而不是驼峰。如 @custom-event="handleEvent"
    'vue/multi-word-component-names': 'off', // 是否要求组件名称都是多单词构成，如 TodoItem
    'vue/valid-attribute-name': 'off', // 是否检测html标签中无效的属性名称
    'vue/one-component-per-file': 'off', // 是否强制每个组件都拥有自己的文件，即不允许通过 Vue.component 注册在其他组件页面中
    'vue/html-closing-bracket-newline': 'off', // 是否在标签的右括号之前要求换行
    'vue/max-attributes-per-line': 'off', // 是否强制每行的最大属性数
    'vue/multiline-html-element-content-newline': 'off', // 是否在多行元素的内容之前和之后需要换行
    'vue/singleline-html-element-content-newline': 'off', // 是否在单行元素的内容之前和之后需要换行
    'vue/attribute-hyphenation': 'off', // 是否在模板中的自定义组件上实施属性命名样式
    'vue/require-default-prop': 'off', // 是否需要 props 的默认值
    'vue/require-prop-types': 'off',
    'vue/require-v-for-key': 'off', // v-for中不需要添加key
    'vue/html-self-closing': [
      // 元素标签自闭合配置
      'error',
      {
        html: {
          void: 'always', // 如 input 之类的空元素(即永远没有子节点)的标签必须自闭合
          normal: 'never', // 普通 html 标签不允许自闭合
          component: 'always', // 自定义组件标签自由选择是否自闭合
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // ts 详细规则：https://typescript-eslint.io/rules/
    '@typescript-eslint/ban-ts-ignore': 'off', // 是否禁止使用 @ts-ignore 来消除 ESLint 检查
    '@typescript-eslint/explicit-function-return-type': 'off', // 是否在函数和类方法上需要显式的返回类型
    '@typescript-eslint/no-explicit-any': 'off', // 是否禁止使用 any 类型
    '@typescript-eslint/no-var-requires': 'off', // 是否除导入语句外，禁止使用 require 语句
    '@typescript-eslint/no-empty-function': 'off', // 是否禁止使用空函数
    '@typescript-eslint/no-use-before-define': 'off', // 是否在定义变量之前不允许使用变量
    '@typescript-eslint/ban-ts-comment': 'off', // 是否禁止使用 @ts- 注解
    '@typescript-eslint/ban-types': 'off', // 是否禁止使用特定类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 是否禁止使用 ! 后缀运算符进行非 null 断言
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 是否在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    '@typescript-eslint/no-unused-vars': [
      // 是否禁止使用未使用的变量
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
});
