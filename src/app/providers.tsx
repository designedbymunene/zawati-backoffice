"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AxiosError } from "axios";
import { ErrorMessage } from "./dashboard/loans/_components/FixedLoanDrawer";

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ErrorMessage>;
	}
}

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = React.useState(() => new QueryClient());
	return (
		<NextUIProvider>
			<NextThemesProvider
				enableSystem={false}
				attribute="class"
				defaultTheme="dark"
				themes={["light", "dark"]}
			>
				<QueryClientProvider client={queryClient}>
					<HydrationOverlay>{children}</HydrationOverlay>
					<ReactQueryDevtools initialIsOpen={false} position="right" />
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
