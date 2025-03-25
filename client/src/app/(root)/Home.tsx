"use client"

import { MainBanner } from "@/components/home/mainBanner/MainBanner"
import { ConcertsBanner } from "@/components/home/concertBanner/ConcertsBanner"
import { ShopBanner } from "@/components/home/shopBanner/ShopBanner"
import { IProduct } from "@/shared/types/product.interface"
import { Tracks } from "@/components/home/tracks/Tracks"

interface HomeProps {
	products: IProduct[]
}

export function Home({ products }: HomeProps) {

	return (
		<div>	
			<MainBanner />
			<ConcertsBanner />
			<ShopBanner products={products}/>
			<Tracks/>
		</div>
	)
}
