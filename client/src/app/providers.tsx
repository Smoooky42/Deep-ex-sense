"use client"

import { type PropsWithChildren, useRef } from "react"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { AppStore, makeStore } from "@/store/store"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// export const AudioContext = createContext<{ audio: HTMLAudioElement | null }>({ audio: null });

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

	// const audio = useRef<HTMLAudioElement | null>(new Audio());

	return (
		// <QueryClientProvider client={client}>
		<Provider store={storeRef.current}>
			{/* <AudioContext.Provider value={{ audio: audio.current }}> */}
				<Toaster />
				{children}
			{/* </AudioContext.Provider> */}
		</Provider>
		// </QueryClientProvider>
	)
}
