export const APP_URL = process.env.CLIENT_URL as string

export const PUBLIC_URL = {
	root: (url = "") => `${url ? url : ""}`,

	home: () => PUBLIC_URL.root("/"),
	auth: () => PUBLIC_URL.root("/auth"),
	
	shop: (searchTerm = '') => PUBLIC_URL.root(`/shop${searchTerm}`),
	product: (id = "") => PUBLIC_URL.root(`/product/${id}`),
}


