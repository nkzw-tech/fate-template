import dotenv from 'dotenv';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';

const root = process.cwd();

dotenv.config({
  path: join(root, './server', '.env'),
  quiet: true,
});

export default defineConfig({});
