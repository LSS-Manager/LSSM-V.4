module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    plugins: ['vue', 'prettier'],
    extends: ['eslint:recommended', 'plugin:vue/essential'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        VERSION: 'readonly',
        BUILD_LANG: 'readonly',
        MODULE_ID: 'readonly',
        MODE: 'readonly',
        FALLBACK_LOCALES: 'readonly',
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'guard-for-in': 2,
        'no-prototype-builtins': 0,
        'prettier/prettier': 'error',
        'semi': ['error', 'always'],
    },
};
