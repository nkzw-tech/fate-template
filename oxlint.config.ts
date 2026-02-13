import nkzw from '@nkzw/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    'coverage',
    'dist',
    'client/dist',
    'client/src/fate.ts',
    'client/src/translations',
    'server/dist',
    'server/src/prisma/pothos-types.ts',
    'server/src/prisma/prisma-client/**',
  ],
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
