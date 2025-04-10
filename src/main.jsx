import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router";
import NavigatedRoutes from "src/configs/NavigatedRoutes.jsx";
import { store } from "src/redux/store.js";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigatedRoutes />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
