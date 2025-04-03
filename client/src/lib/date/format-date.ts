export const formatDate = (dateString: string) => {
	const date = new Date(dateString)

	const day = String(date.getDate()).padStart(2, "0")
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const year = date.getFullYear()

	return `${day}.${month}.${year}`
}

export const sortByDate = (arr: any[]) => {
	// "@ts-expect-error"
	return arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
};
