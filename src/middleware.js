import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/signin';
  const publicPath = path === '/visitor-details';
  const restrictedAdminPath = path === '/visitor-registration';

  const token = request.cookies.get('vms_token')?.value;
  const userDetails = request.cookies.get('user_details')?.value;

  if ((isLoginPage || publicPath) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (restrictedAdminPath && userDetails === 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isLoginPage && !publicPath && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/visitor-details', '/visitor-registration', '/signin'],
};
