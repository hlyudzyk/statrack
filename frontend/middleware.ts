import { NextRequest, NextResponse } from 'next/server';
import {getAccessToken} from "@/app/lib/actions";

export async function middleware(request: NextRequest) {
  const token = await getAccessToken()

  if (!token) {
    return NextResponse.redirect(new URL('/auth-option', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|login|auth-option|account/activate).*)',
  ],
};