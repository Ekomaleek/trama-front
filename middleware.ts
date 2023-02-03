import { NextResponse, NextRequest } from 'next/server'

import { getCurrentScope } from 'helpers/route-scopes'

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const pathname = request.nextUrl.pathname
  if (pathname === '/404') return NextResponse.next()

  const currentScope = getCurrentScope(pathname)
  if (currentScope === null) return NextResponse.redirect(new URL('/404', request.url))

  const isAuthCookieSet = request.cookies.has(process.env.COGNITO_JWTID_COOKIE_NAME)
  let isAuthCookieValid = false
  // Fetch because axios doesnt work inside middleware
  if (isAuthCookieSet) {
    const authCookie = request.cookies.get(process.env.COGNITO_JWTID_COOKIE_NAME)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: authCookie?.value,
        }),
      }
    )

    if (response.ok) {
      isAuthCookieValid = true
    } else {
      request.cookies.delete(process.env.COGNITO_JWTID_COOKIE_NAME)
    }
  }

  if (!isAuthCookieValid && currentScope === 'loggedInUsers') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthCookieValid && currentScope === 'notLoggedInUsers') {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
}
