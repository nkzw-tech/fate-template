/// <reference types="fbtee/ReactTypes.d.ts" />

import './App.css';
import Stack from '@nkzw/stack';
import { createLocaleContext } from 'fbtee';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { FateClient } from 'react-fate';
import { BrowserRouter, Route, Routes } from 'react-router';
import AvailableLanguages from './lib/AvailableLanguages.tsx';
import { fate } from './lib/fate.tsx';
import HomeRoute from './routes/HomeRoute.tsx';
import PostRoute from './routes/PostRoute.tsx';
import SearchRoute from './routes/SearchRoute.tsx';
import SignInRoute from './routes/SignInRoute.tsx';
import Card from './ui/Card.tsx';
import Error from './ui/Error.tsx';
import Header from './ui/Header.tsx';
import Section from './ui/Section.tsx';

const LocaleContext = createLocaleContext({
  availableLanguages: AvailableLanguages,
  clientLocales: [navigator.language, ...navigator.languages],
  loadLocale: async (locale: string) => {
    if (locale !== 'en_US' && AvailableLanguages.has(locale)) {
      return (await import(`./translations/${locale}.json`)).default[locale];
    }

    return {};
  },
});

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_0,rgba(99,102,241,0.08),transparent_28%)]">
        <Header />
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <Section>
              <Card>
                <Error error={error} />
              </Card>
            </Section>
          )}
        >
          <Suspense
            fallback={
              <Section>
                <Stack center className="animate-pulse text-gray-500 italic" verticalPadding={48}>
                  <fbt desc="Text for thinking/loading screen">Thinking…</fbt>
                </Stack>
              </Section>
            }
          >
            <Routes>
              <Route element={<HomeRoute />} path="/" />
              <Route element={<PostRoute />} path="/post/:id" />
              <Route element={<SearchRoute />} path="/search" />
              <Route element={<SignInRoute />} path="/login" />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleContext>
      <FateClient client={fate}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FateClient>
    </LocaleContext>
  </StrictMode>,
);
