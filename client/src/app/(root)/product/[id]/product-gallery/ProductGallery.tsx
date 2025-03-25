import Image from 'next/image'
import { useState } from 'react'

import { IProduct } from '@/shared/types/product.interface'

import styles from './productGallery.module.scss'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
	product: IProduct
}

export function ProductGallery({ product }: ProductGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	return (
		<div>
			<Image
				src={product.images[currentIndex]}
				alt={product.name}
				width={500}
				height={500}
				className={styles.image}
				priority
			/>
			<div className={styles.gallery}>
				{product.images.map((image, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={cn(
							styles.item,
							index === currentIndex
								? 'border-black'
								: 'border-transparent'
						)}
					>
						<Image
							src={image}
							alt={product.name}
							width={100}
							height={100}
							className={styles.image}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
