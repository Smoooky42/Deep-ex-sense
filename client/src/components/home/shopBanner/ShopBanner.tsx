'use client'

import { IProduct } from '@/shared/types/product.interface'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import styles from './shopBanner.module.scss'
import { ProductCard } from '@/components/shop/productCard/ProductCard'

interface ShopBannerProps {
  products: IProduct[]
}

export function ShopBanner({ products }: ShopBannerProps) {

  return (
    <div className={styles.shopBanner_container}>
      <h1>Товары</h1>
      <Carousel className="w-full max-w-[65%]">
        <CarouselContent className="-ml-1 gap-8">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card className="h-[244px] flex items-center justify-center">
                  <CardContent className="flex h-auto items-center justify-center p-6">
                    <ProductCard product={product} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}