export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = "") => `${url ? url : ""}`,

	home: () => PUBLIC_URL.root("/"),
	auth: () => PUBLIC_URL.root("/auth"),
	
	shop: (query = '') => PUBLIC_URL.root(`/shop${query}`),
	product: (id = "") => PUBLIC_URL.root(`/product/${id}`),
	// category: (id = "") => PUBLIC_URL.root(`/category/${id}`),
}


