"use client";

import { cn } from "@/lib/utils";
import SuiWalletProvider from "@/components/providers/SuiWalletProvider";
import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AppContextProvider } from "./AppContextProvider";
import ToastProvider from "./ToastProvider";

const queryClient = new QueryClient();
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiWalletProvider>
        <ToastProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </ToastProvider>
      </SuiWalletProvider>
    </QueryClientProvider>
  );
};

export default Provider;
