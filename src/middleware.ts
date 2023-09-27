import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SessionProvider from './app/provider/session';

const session = new SessionProvider();

export function middleware (request: NextRequest) {
	const url = request.nextUrl.clone();
	if (!session.isAuthenticated()) {
		if (request.nextUrl.pathname.startsWith('/signed')) {
			url.pathname = '/';
			return NextResponse.redirect(url);
		}
	} else {
		if (request.nextUrl.pathname.startsWith('/public')) {
			url.pathname = '/signed/home';
			return NextResponse.redirect(url);
		}
	}
}
