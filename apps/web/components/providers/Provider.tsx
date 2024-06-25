"use client";

import { cn } from "@/lib/utils";
import SuiWalletProvider from "@/components/providers/SuiWalletProvider";
import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AppContextProvider } from "./AppContextProvider";
import ToastProvider from "./ToastProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toaster from "../shared/Toaster";

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SuiWalletProvider>
        <ToastProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </ToastProvider>
      </SuiWalletProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
