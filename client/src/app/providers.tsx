"use client"

import { type PropsWithChildren, useRef, useState } from "react"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"

import { AppStore, makeStore } from "@/store/store"

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: PropsWithChildren) {
	// const [client] = useState(
	// 	new QueryClient({
	// 		defaultOptions: {
	// 			queries: {
	// 				refetchOnWindowFocus: false
	// 			}
	// 		}
	// 	})
	// )

	const storeRef = useRef<AppStore>(undefined)
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	return (
		// <QueryClientProvider client={client}>
		<Provider store={storeRef.current}>
			<Toaster />
			{children}
		</Provider>
		// </QueryClientProvider>
	)
}
