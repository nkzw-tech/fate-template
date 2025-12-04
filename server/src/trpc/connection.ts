import { withConnection } from '@nkzw/fate/server';
import type { AppContext } from './context.ts';
import { procedure } from './init.ts';

export const createConnectionProcedure = withConnection<AppContext>(procedure);
