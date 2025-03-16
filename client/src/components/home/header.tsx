'use client'

import { PUBLIC_URL } from "@/config/url.config";
import { SITE_NAME } from "@/shared/constants/seo.constants";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { formatPrice } from "@/lib/string/format-price";
import { OrderItem } from "./orderItem";
import styles from './header.module.scss'
import { IOrderItem } from "@/shared/types/orderItem.interface";
import { useCheckout } from "@/hooks/useCheckout";
import { useRouter } from "next/navigation";

export function Header() {
    const [query, setQueryTerm] = useState<string>('')

    const router = useRouter()
    const items: IOrderItem[] = [{ //TODO: заменить на реальные данные
        id: '1',
        quantity: 2,
        price: 100,
        product: {
            id: '1',
            name: 'Product 1',
            price: 100,
            images: ['/images/product1.jpg'],
            description: 'Product 1',
            category: {
                id: '1',
                name: 'Category 1'
            }
        },
    }]
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )
    const { handleCreateOrder: createPayment, isLoading: isLoadingOrder } = useCheckout()
    const user = false

    const handleClick = () => {
        user ? createPayment() : router.push(PUBLIC_URL.auth())
    }

    return (
        <div className={styles.header}>
            <Link href={PUBLIC_URL.home()} className={styles.logo}>
                <Image
                    src='/images/auth.jpg'
                    alt={SITE_NAME}
                    width={45}
                    height={45}
                />
                <div>{SITE_NAME}</div>
            </Link>

            <div className={styles.search}>
                <Input
                    placeholder='Поиск товаров'
                    value={query}
                    onChange={e => setQueryTerm(e.target.value)}
                />
                <Button
                    onClick={() =>
                        router.push(
                            PUBLIC_URL.shop(`?query=${query}`)
                        )
                    }
                >
                    <FaSearch />
                </Button>
            </div>

            <div className={styles.header_menu}>
                <Link href={PUBLIC_URL.shop()}> {/*поменять роут */}
                    <Button variant='ghost' className={styles.header_menu_button}>Каталог</Button>
                </Link>
                <Link href={PUBLIC_URL.shop()}>
                    <Button variant='ghost' className={styles.header_menu_button}>Магазин</Button>
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='ghost' className={styles.header_menu_button}>Корзина</Button>
                    </SheetTrigger>
                    <SheetContent className={styles.sheet}>
                        <div className='space-y-1'>
                            <h2 className='text-2xl font-medium'>Корзина товаров</h2>
                        </div>
                        <div className={styles.items}>
                            {items.length ? (
                                items.map(item => (
                                    <OrderItem item={item} key={item.id} />
                                ))
                            ) : (
                                <div className={styles.not_found}>Корзина пустая!</div>
                            )}
                        </div>
                        {items.length ? (
                            <>
                                <div className={styles.total}>
                                    Итого к оплате: {formatPrice(total)}
                                </div>
                                <Button
                                    onClick={handleClick}
                                    disabled={isLoadingOrder}
                                >
                                    Перейти к оплате
                                </Button>
                            </>
                        ) : null}
                    </SheetContent>
                </Sheet>

                {!user && (
                    <Link href={PUBLIC_URL.auth()}>
                        <Button variant='outline' className='bg-white text-black hover:scale-110'>
                            <LogOut className={styles.icon} />
                            Войти
                        </Button>
                    </Link>
                )}
            </div>
        </div >
    )
}