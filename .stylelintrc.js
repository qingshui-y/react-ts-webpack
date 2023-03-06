module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件
    'stylelint-config-standard-scss' // 配置stylelint scss插件
  ],
  plugins: ['stylelint-order', 'stylelint-less'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': null,
    'color-no-invalid-hex': true,
    'less/color-no-invalid-hex': true
  }
};
