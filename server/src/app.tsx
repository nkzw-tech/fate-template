#!/usr/bin/env NODE_ENV=development node_modules/.bin/nodemon -q -I --exec node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm --env-file .env
import { trpcServer } from '@hono/trpc-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { styleText } from 'node:util';
import { auth } from './lib/auth.ts';
import env from './lib/env.ts';
import prisma from './prisma/prisma.ts';
import { appRouter } from './router.ts';
import { createContext } from './trpc/context.ts';

try {
  await prisma.$connect();
} catch (error) {
  console.error(`${styleText(['red', 'bold'], 'Prisma Database Connection Error')}\n`, error);
  process.exit(1);
}

const origin = env('CLIENT_DOMAIN');
const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin,
  }),
);

app.use(
  '/trpc/*',
  trpcServer({
    createContext: (_, context) => createContext({ context }),
    router: appRouter,
  }),
);

app.on(['POST', 'GET'], '/api/auth/*', ({ req }) => auth.handler(req.raw));

app.all('/*', (context) => context.redirect(origin));

export default app;
