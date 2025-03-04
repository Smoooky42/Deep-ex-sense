import { NO_INDEX_PAGE } from "@/shared/constants/seo.constants";
import { Metadata } from "next";
import { Home } from "./Home";

export const metadata: Metadata = {
    title: 'Основная',
    ...NO_INDEX_PAGE
}

export default  function HomePage() {
    return <Home/>
}