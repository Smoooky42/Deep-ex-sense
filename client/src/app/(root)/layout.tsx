import { Footer } from "@/components/home/footer"
import { Header } from "@/components/home/header"
import { PropsWithChildren } from "react"

import styles from "./layout.module.scss"

export default function Layout({ children }: Readonly<{children: React.ReactNode}>) {
	return (
		<div className={styles.wrapper}>
		{/* <Header /> */}
		<main>{children}</main>
		<Footer />
	</div>
	)
}
