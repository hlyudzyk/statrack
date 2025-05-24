import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('session_userid', '', { path: '/', expires: new Date(0) });
  cookieStore.set('session_access_token', '', { path: '/', expires: new Date(0) });
  cookieStore.set('session_refresh_token', '', { path: '/', expires: new Date(0) });

  return NextResponse.json({ success: true });
}
