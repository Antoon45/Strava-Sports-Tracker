module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  
  rules: {
    'no-console': ['off'],
    'vue/name-property-casing': ['off'],
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/max-attributes-per-line': ['off'],
    'vue/v-on-style': ['off'],
    'vue/v-bind-style': ['off'],
    'vue/multiline-html-element-content-newline': ['off'],
    'vue/html-indent': ['off'],
    'vue/html-self-closing': ['off']
  },
  
};