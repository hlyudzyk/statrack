import { NextRequest, NextResponse } from 'next/server';
import {getAccessToken} from "@/app/lib/actions";

export async function middleware(request: NextRequest) {
  const token = await getAccessToken()

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|login|account/activate).*)',
  ],
};