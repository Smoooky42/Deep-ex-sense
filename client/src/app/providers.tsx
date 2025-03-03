'use client'

import { type PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from "@/store/store"
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

	return (
		// <QueryClientProvider client={client}>
		<Provider store={store}>
			<Toaster />
			{children}
		</Provider>
		// </QueryClientProvider>
	)
}
