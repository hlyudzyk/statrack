import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  cookies().set('session_userid', '', { path: '/', expires: new Date(0) });
  cookies().set('session_access_token', '', { path: '/', expires: new Date(0) });
  cookies().set('session_refresh_token', '', { path: '/', expires: new Date(0) });

  return NextResponse.json({ success: true });
}
