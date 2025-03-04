export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	user: (url = '') => API_URL.root(`/users${url}`),
	products: (url = '') => API_URL.root(`/products${url}`),
	categories: (url = '') => API_URL.root(`/categories${url}`),
	order: (url = '') => API_URL.root(`/orders${url}`),
	files: (url = '') => API_URL.root(`/files${url}`),
	basket: (url = '') => API_URL.root(`/basket${url}`),
	roles: (url = '') => API_URL.root(`/roles${url}`),
	track: (url = '') => API_URL.root(`/track${url}`),
}