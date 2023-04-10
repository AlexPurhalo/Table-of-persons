import { StrictMode } from "react";
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureStore } from '@reduxjs/toolkit';
import personsReducer from './personsSlice'
import App from "./components/App";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = configureStore({
  reducer: {
    persons: personsReducer,
  },
});

root.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode >
);
