import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
          semi: ['error', 'never'],
          quotes: ['error', 'double', { avoidEscape: true }],
          indent: ['error', 2],
          'comma-dangle': ['error', 'always-multiline'],
          'object-curly-spacing': ['error', 'always'],
          'array-bracket-spacing': ['error', 'never'],
          'arrow-spacing': ['error', { before: true, after: true }],
          'no-console': 'warn',
          'no-unused-vars': 'off',
          '@typescript-eslint/no-unused-vars': 'warn',
          '@typescript-eslint/no-explicit-any': 'warn',
          '@typescript-eslint/no-non-null-assertion': 'warn',
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        },
  },
])
