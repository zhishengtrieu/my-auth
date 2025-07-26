import { auth } from "@/utils/auth"
import { NextResponse, NextRequest } from "next/server"

const AUTH_PAGES = ['/login', '/register']
const PROTECTED_ROUTES = ["/dashboard", "/account"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  let session
  try {
    session = await auth()
  } catch (error) {
    console.error("Error fetching session:", error)
    // En cas d'erreur, on laisse la requête passer
    return NextResponse.next()
  }

  const isAuthPage = AUTH_PAGES.some(page => pathname === page)
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))

  if (session && isAuthPage) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  if (!session && isProtected) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
