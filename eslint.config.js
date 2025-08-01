const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const stylisticTs = require('@stylistic/eslint-plugin');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const nextPlugin = require('@next/eslint-plugin-next');

module.exports = tseslint.config({
  files: ['**/*.{js,ts,jsx,tsx}'],
  ignores: ['node_modules', '.next', 'dist'],
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    eslintPluginPrettierRecommended,
  ],
  plugins: {
    '@typescript-eslint/eslint-plugin': typescriptEslintPlugin,
    '@stylistic/ts': stylisticTs,
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-duplicate-type-constituents': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@stylistic/ts/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        importAttributes: 'never',
        dynamicImports: 'never',
        enums: 'always-multiline',
      },
    ],
    '@stylistic/ts/comma-spacing': 'error',
    '@stylistic/ts/no-extra-semi': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignore: [
          -1, 0, 1, 2, 3, 5, 8, 10, 12, 15, 16, 20, 24, 32, 50, 100, 255, 400,
          401, 403, 404, 409, 429, 500, 1000,
        ],
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@stylistic/ts/quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true },
    ],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions'],
      },
    ],
    '@stylistic/ts/func-call-spacing': 'error',
    '@stylistic/ts/keyword-spacing': 'error',
    '@stylistic/ts/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterOverload: false },
    ],
    '@stylistic/ts/space-before-blocks': 'error',
    '@stylistic/ts/semi': 'error',
    '@stylistic/ts/space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never', asyncArrow: 'always' },
    ],
    '@stylistic/ts/space-infix-ops': ['error', { int32Hint: false }],
    '@stylistic/ts/object-curly-spacing': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        trailingComma: 'all',
      },
    ],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-var': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-duplicate-case': 'error',
    'prefer-const': 'error',
    curly: 'error',
    eqeqeq: ['error', 'smart'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
