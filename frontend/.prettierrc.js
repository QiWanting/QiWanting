module.exports = {
  printWidth: 100, // 编辑器每行的最大长度，超过就自动换行，默认值 80
  // tabWidth: 2, // 制表符 tab 的宽度，默认值是 2
  // useTabs: false, // 代码缩进是否用制表符 tab，默认 false
  semi: true, // 是否使用分号，默认 true
  singleQuote: true, // 是否使用单引号，默认为 false
  quoteProps: 'as-needed', // 对象属性的引号使用。as-needed :仅在需要的时候使用 | consistent 有一个属性需要引号，就都需要引号 | preserve 保留用户输入的情况
  jsxSingleQuote: false, // jsx 是否使用单引号，默认为 false
  trailingComma: 'all', // 对象的最后一个属性是否有末尾逗号。默认 "es5"。 none：末尾没有逗号 | es5：es5有效的地方保留 | all：在可能的地方都加上逗号
  bracketSpacing: true, // 字面量对象括号中的空格，默认true。 true : { foo: bar } | false : {foo: bar}.
  bracketSameLine: false, // 是否将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行，默认 false
  arrowParens: 'avoid', // 箭头函数中的括号。默认 always。 avoid: 在有需要的时候使用. Example: x => x | always - 一直使用. Example: (x) => x
  // rangeStart: 0, // 格式化代码的区间
  // rangeEnd: Infinity, // 格式化代码的区间
  // requirePragma: false, // 是否严格按照文件顶部的特殊注释格式化代码。如仅格式化带有 @format 或 @prettier 标识的文件
  // insertPragma: false, // 插入在文件头部是否在格式化的文件顶部插入 Pragma 标记（如 @format），以表明该文件被 prettier 格式化过了
  proseWrap: 'never', // 超宽换行， 默认 "preserve"
  htmlWhitespaceSensitivity: 'strict', // html文件的空格敏感度。strict：所有的空格换行情况都保留 | ignore：所有元素间的空格都会被忽略
  vueIndentScriptAndStyle: true, // 是否缩进 Vue 文件中 <script> 和 <style> 标记内的代码。默认 false
  endOfLine: 'auto', // 行末尾标识,  默认 'lf'。可选值 <lf|crlf|cr|auto>
};
