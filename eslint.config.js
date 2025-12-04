import nkzw from '@nkzw/eslint-config';
import findWorkspaces from '@nkzw/find-workspaces';

export default [
  ...nkzw,
  {
    ignores: [
      'coverage',
      'dist',
      'client/dist',
      'client/src/fate.ts',
      'server/dist',
      'server/src/prisma/pothos-types.ts',
      'server/src/prisma/prisma-client/*',
    ],
  },
  {
    files: [
      './server/scripts/**/*.tsx',
      './server/src/{app,index}.tsx',
      './server/src/prisma/seed.tsx',
      '**/__tests__/**',
    ],
    rules: {
      'no-console': 0,
    },
  },
  {
    files: ['server/**/*.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 0,
    },
  },
  {
    rules: {
      '@typescript-eslint/array-type': [2, { default: 'generic' }],
      '@typescript-eslint/no-explicit-any': 0,
      'import-x/no-extraneous-dependencies': [
        2,
        {
          devDependencies: [
            './.vitepress/**',
            './eslint.config.js',
            './client/vite.config.ts',
            './server/prisma.config.ts',
            './server/scripts/**/*.tsx',
            '**/__tests__/**',
            '**/tsdown.config.ts',
            'vitest.config.ts',
          ],
          packageDir: findWorkspaces(import.meta.dirname),
        },
      ],
    },
  },
];
