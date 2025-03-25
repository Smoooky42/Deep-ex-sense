'use client'

import { PUBLIC_URL } from "@/config/url.config";
import { SITE_NAME } from "@/shared/constants/seo.constants";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { use, useState } from "react";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { formatPrice } from "@/lib/string/format-price";
import { OrderItem } from "./orderItem";
import styles from './header.module.scss'
import { useCheckout } from "@/hooks/useCheckout";
import { useRouter } from "next/navigation";
import { useOrderItems } from "@/hooks/useOrderItems";
import { useAppSelector } from "@/hooks/redux";
import { useRefreshQuery } from "@/services/authService";

export function Header() {
    const [searchTerm, setSearchTerm] = useState<string>('')

    // useRefreshQuery()    //Для убирания кнопки логин, если авторизован. Но проблема в том, что если не авторизован, приходит ошибка 404, ловит интерсептор и перекидывает на /auth
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    const router = useRouter()
    const { items, total } = useOrderItems()
    const { handleCreateOrder: createPayment, isLoading: isLoadingOrder } = useCheckout()

    const handleClick = () => {
        isAuthenticated ? createPayment() : router.push(PUBLIC_URL.auth())
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
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <Button
                    onClick={() =>
                        router.push(
                            PUBLIC_URL.shop(`?searchTerm=${searchTerm}`)
                        )
                    }
                >
                    <FaSearch />
                </Button>
            </div>

            <div className={styles.header_menu}>
                <Link href={PUBLIC_URL.shop()}>
                    <Button variant='ghost' className={styles.header_menu_button}>Магазин</Button>
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='ghost' className={styles.header_menu_button}>Корзина</Button>
                    </SheetTrigger>
                    <SheetContent className={styles.sheet}>
                        <SheetHeader>
                            <SheetTitle>
                                <div className='space-y-1'>
                                    <h2 className='text-2xl font-medium'>Корзина товаров</h2>
                                </div>
                            </SheetTitle>
                            <SheetDescription>Добавляйте свои покупки</SheetDescription>
                        </SheetHeader>
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

                {!isAuthenticated && (
                    <Link href={PUBLIC_URL.auth()}>
                        <Button variant='outline' className='bg-white text-black w-[100px] hover:scale-110'>
                            <LogOut className={styles.icon} />
                            Войти
                        </Button>
                    </Link>
                )}
            </div>
        </div >
    )
}