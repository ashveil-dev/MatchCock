import "./index.css"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from "react-router"
import App from "App";
import Tournament from '@pages/Tournament/index'
import Club from "@pages/Club";
import Schedule from "@pages/Schedule";

const { worker } = await import("./test/server");

await worker.start({
  serviceWorker: {
    url: "/MatchCock/mockServiceWorker.js",
  },
  onUnhandledRequest: "bypass",
});


// TypeScript only:
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__:
      import('@tanstack/query-core')
        .QueryClient
  }
}

const queryClient = new QueryClient();
window.__TANSTACK_QUERY_CLIENT__ = queryClient

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route index path="/MatchCock" element={<App />} />
          <Route path="/MatchCock/Tournament" element={<Tournament />} />
          <Route path="/MatchCock/Club" element={<Club />} />
          <Route path="/MatchCock/Schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
