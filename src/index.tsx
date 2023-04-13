import React, { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { personsReducer } from './personsSlice'
import App from "./components/App";

const queryClient = new QueryClient();

const rootReducer = combineReducers({ persons: personsReducer })

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof store.getState>;

const rootElement = document.getElementById('root');
const root = rootElement && createRoot(rootElement);

if (root) {
  root.render(
    // <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider >
    // </StrictMode>
  );
}