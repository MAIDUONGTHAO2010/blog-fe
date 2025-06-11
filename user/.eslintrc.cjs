module.exports = {
  root: true,

  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },

  extends: [
    '@nuxt/eslint-config',
    'plugin:vue/vue3-essential',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier'],

  rules: {
    'vue/multi-word-component-names': 0,
  },
}
