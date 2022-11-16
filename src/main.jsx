import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
