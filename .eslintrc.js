module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/no-v-html': ['never'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'no-console': ['warn'],
  }
};
