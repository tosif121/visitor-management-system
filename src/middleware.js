import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/signin';
  const isRegisterPage = path === '/visitor-details';
  const token = request.cookies.get('vms_token')?.value;

  if ((isLoginPage || isRegisterPage) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isLoginPage && !isRegisterPage && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/visitor-details', '/visitor-registration', '/signin'],
};
