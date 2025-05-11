'use server';

import {cookies} from "next/headers";

export async function getBackendUrl(){
  return process.env.NEXT_PUBLIC_API_URL;
}

export async function handleRefresh(){
  const refreshToken = await getRefreshToken();
  console.log(refreshToken)

  const token = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh-token`, {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Authorization' : `Bearer ${refreshToken}`
        }
      })
      .then(response=>response.json())
      .then((json)=>{
        console.log("Response - refresh: ", json)

        if(json.access_token){
          cookies().set('session_access_token',json.access_token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            maxAge:60*60,//60 minutes
            path:'/'
          });
          return json.access_token;
        } else{
          resetAuthCookies();
        }
      })
      .catch((error)=>{
        console.log('Error',error)
        resetAuthCookies();
      })
  return token;
}

export async function handleLogin(userId:string,accessToken:string,refreshToken:string){
  cookies().set('session_userid',userId,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    maxAge:60*60*24*7,//One week
    path:'/'
  });

  cookies().set('session_access_token',accessToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    maxAge:60*60,//60 minutes
    path:'/'
  });

  cookies().set('session_refresh_token',refreshToken,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    maxAge:60*60*24*7,//One week
    path:'/'
  });

}

export async function resetAuthCookies(){
  cookies().set('session_userid', '', { path: '/', expires: new Date(0) });
  cookies().set('session_access_token', '', { path: '/', expires: new Date(0) });
  cookies().set('session_refresh_token', '', { path: '/', expires: new Date(0) });
}

export async function getUserId() {
  const cookieStore = cookies();
  const userId = await cookieStore.get('session_userid')?.value;
  return userId ?? null;
}
export async function getAccessToken(){
  let accessToken = await cookies().get('session_access_token')?.value;

  if(!accessToken){
    await handleRefresh();
  }

  return accessToken;
}

async function getRefreshToken() {
  let refreshToken = await cookies().get('session_refresh_token')?.value;
  return refreshToken;
}
