import { auth } from "@/utils/auth"
import { NextResponse, NextRequest } from "next/server"

const AUTH_PAGES = ['/login', '/register']
const protectedRoutes = ["/dashboard", "/account"]

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = request.nextUrl
  const session = await auth()
  const isAuthPage = AUTH_PAGES.includes(pathname)
  if (session && isAuthPage) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  if (!session && protectedRoutes.includes(pathname)) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
