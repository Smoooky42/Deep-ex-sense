export const getReviewWordWithEnding = (reviewCount: number) => {
	switch (true) {
		case [1, 21, 31].includes(reviewCount):
			return `${reviewCount} отзыв`
		case [2, 3, 4, 22, 23, 24, 34].includes(reviewCount):
			return `${reviewCount} отзыва`
		default:
			return `${reviewCount} отзывов`
	}
}
