import { Metadata } from "next"

import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants"

import { Home } from "./Home"

export const metadata: Metadata = {
	title: "Основная",
	...NO_INDEX_PAGE
}

export default function HomePage() {
	return <Home />
}
