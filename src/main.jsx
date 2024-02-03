import "./index.css";
import Authcontext from "./Authcontext/Authcontext";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { route } from "./Routes/route";

const quaryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={quaryClient}>
      <Authcontext>
        <RouterProvider router={route} />
        <Toaster position="top-center" />
      </Authcontext>
    </QueryClientProvider>
  </React.StrictMode>,
)
