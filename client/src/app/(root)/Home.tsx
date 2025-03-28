"use client"

import { MainBanner } from "@/components/home/mainBanner/MainBanner"
import { ConcertsBanner } from "@/components/home/concertBanner/ConcertsBanner"
import { ShopBanner } from "@/components/home/shopBanner/ShopBanner"
import { IProduct } from "@/shared/types/product.interface"
import { Tracks } from "@/components/home/tracks/Tracks"
import { Fireflies } from "@/components/home/Fireflies/Fireflies"

interface HomeProps {
	products: IProduct[]
}

export function Home({ products }: HomeProps) {

	return (
		<div>	
			<Fireflies />
			<MainBanner />
			<ConcertsBanner />
			<ShopBanner products={products}/>
			<Tracks/>
		</div>
	)
}
