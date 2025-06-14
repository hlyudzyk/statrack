'use server';

import {cookies} from "next/headers";

export async function getBackendUrl(){
  return process.env.NEXT_PUBLIC_API_URL;
}

export async function handleRefresh(){
  const refreshToken = await getRefreshToken();

  const token = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Authorization' : `Bearer ${refreshToken}`
        }
      })
      .then(response=>response.json())
      .then(async (json)=>{

        if(json.access_token){
          const cookieStore =  await cookies();
          cookieStore.set('session_access_token',json.access_token,{
            httpOnly:true,
            secure:false, //process.env.NODE_ENV==='production',
            maxAge:Number(process.env.ACCESS_TOKEN_EXPIRY),
            path:'/'
          });
          return json.access_token;
        } else{
          resetAuthCookies();
        }
      })
      .catch((error)=>{
        resetAuthCookies();
      })
  return token;
}

export async function handleLogin(userId:string,accessToken:string,refreshToken:string){
  const cookieStore = await cookies();
  cookieStore.set('session_userid',userId,{
    httpOnly:true,
    secure:false,
    maxAge:Number(process.env.REFRESH_TOKEN_EXPIRY),
    path:'/'
  });

  cookieStore.set('session_access_token',accessToken,{
    httpOnly:true,
    secure:false,
    maxAge:Number(process.env.ACCESS_TOKEN_EXPIRY),
    path:'/'
  });

  cookieStore.set('session_refresh_token',refreshToken,{
    httpOnly:true,
    secure:false,
    maxAge:Number(process.env.REFRESH_TOKEN_EXPIRY),
    path:'/'
  });

}

export async function resetAuthCookies(){
  const cookieStore = await cookies();

  cookieStore.set('session_userid', '', { path: '/', expires: new Date(0) });
  cookieStore.set('session_access_token', '', { path: '/', expires: new Date(0) });
  cookieStore.set('session_refresh_token', '', { path: '/', expires: new Date(0) });
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = await cookieStore.get('session_userid')?.value;
  return userId ?? null;
}
export async function getAccessToken(){
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('session_access_token')?.value;

  if(!accessToken){
    const refreshToken = cookieStore.get('session_refresh_token')?.value;

    if (!refreshToken) {
      return null;
    }
    await handleRefresh();
    accessToken = cookieStore.get('session_access_token')?.value;

  }

  return accessToken ?? null;
}

async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get('session_refresh_token')?.value;
}
