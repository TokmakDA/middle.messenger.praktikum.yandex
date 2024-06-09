module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node_modules', 'src/*'],
      },
    },
  },
  ignorePatterns: ['dist'],
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['./tpl.hbs', '@types/*'],
      },
    ],
    'prettier/prettier': 'error',
    'no-console': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        ts: 'never',
        ignorePackages: true,
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': [
      'off' | 'warn' | 'error',
      { target: 'any' },
    ],
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['off'],
  },
};
