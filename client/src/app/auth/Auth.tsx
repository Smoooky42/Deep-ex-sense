'use client'

import { useState } from "react"
import { useAuthForm } from "./useAuthForm"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { AuthFields } from "./AuthFields"
import { Social } from "./Social"
import styles from './Auth.module.scss'


export function Auth() {
	const [isReg, setIsReg] = useState(false)

	const { onSubmit, form, isLoading } = useAuthForm(isReg)

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src='/images/auth.jpg'
					alt='Deep-ex-sense auth'
					width={200}
					height={200}
					priority
				/>
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>
							{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
						</CardTitle>
						<CardDescription>
							Войдите или создайте учетную запись, чтобы оформлять покупки!
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<AuthFields
									form={form}
									isLoading={isLoading}
									isReg={isReg}
								/>

								<Button disabled={isLoading}>Продолжить</Button>
							</form>
						</Form>
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
						<button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Войти' : 'Создать'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}
