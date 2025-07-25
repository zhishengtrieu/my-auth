import { auth } from "@/utils/auth"
import { NextResponse, NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  if (session && isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }
}
