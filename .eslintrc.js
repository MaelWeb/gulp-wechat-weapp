module.exports = {
  extends: ["airbnb-base"],
  globals: {
    wx: true,
    getApp: true,
    getCurrentPages: true,
    Component: true,
    App: true,
    Page: true
  },
  rules: {
    "indent": [0, 4], // 4个空格作为代码缩进
    "no-underscore-dangle": 0, // 允许使用下划线定义变量或方法，例如 _name
    "class-methods-use-this": 0, // 允许如果方法内没有用到this，不需强制定义成静态方法。
    "no-unused-expressions": [0, { "allowShortCircuit": true }], // 允许使用表达式
    "no-new": 0, // 这个规则旨在通过禁止使用new不将结果对象分配给变量的关键字的构造函数调用来维护一致性和约定。
    "object-property-newline": 0, // 允许对象属性不换行
    "object-curly-newline": 0,
    "no-plusplus": [0, { "allowForLoopAfterthoughts": true }],
    "prefer-promise-reject-errors": 0,
    "no-restricted-properties": 0,
    "no-param-reassign": 0,
    "no-else-return": 0,
    "linebreak-style":0,
    "import/no-unresolved": 0,
  }
};
