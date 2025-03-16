import { type NextRequest, NextResponse } from 'next/server'
import { PUBLIC_URL } from './config/url.config'

enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	// const accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN) //Нельзя, так как на сервере нет localStorage

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(
				new URL(PUBLIC_URL.home(), request.url)
			)
		}

		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth']
}
