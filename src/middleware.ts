import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Cookies from "js-cookie";

const publicPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);
  let cookie = request.cookies.get('currentUser')?.value;
  if(!isPublicPath && !cookie) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
  if(isPublicPath && cookie){
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
  console.log(path);

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return NextResponse.next();
}

export function handleSignOut() {
      Cookies.remove('currentUser');
      window.location.href = '/login';
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
