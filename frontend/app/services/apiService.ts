
import {getAccessToken} from "@/app/lib/actions";

const apiService = {
  get: async function (url:string, auth:boolean=true): Promise<any>{
    const access_token = await getAccessToken()

    return new Promise((resolve,reject)=>{
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
      if(auth) {
        headers['Authorization'] = `Bearer ${access_token}`
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: 'GET',
        headers:headers
      })
      .then(response=>response.json())
      .then((json)=>{
        resolve(json)
      })
      .catch((error)=>{
        reject(error)
      })
    })
  },
  post: async function(url:string, data:any, contentType: string | null = null):Promise<any> {

    const token = await getAccessToken();
    const headers   = {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
    }
    if (contentType!==null){
      headers["Content-Type"] = contentType
    }

    return new Promise((resolve,reject)=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: 'POST',
        body:data,
        headers:headers,
      })
      .then(response=>response.json())
      .then((json)=>{
        resolve(json)
      })
      .catch((error)=>{
        reject(error)
      })
    })
  },

  delete: async function (url: string): Promise<any> {
    const access_token = await getAccessToken();

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await response.json();
          resolve(json);
        } else {
          resolve({ success: response.ok });
        }
      })
      .catch((error) => reject(error));
    });
  },
  put: async function(url:string, data:any):Promise<any> {
    const token = await getAccessToken();

    return new Promise((resolve,reject)=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: 'PUT',
        body:data,
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response=>response.json())
      .then((json)=>{
        //console.log('Response',json);
        resolve(json)
      })
      .catch((error)=>{
        reject(error)
      })
    })
  },
  postWithoutToken: async function(url:string, data:any, contentType: string | null = null):Promise<any> {
    const headers   = {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    }
    if (contentType!==null){
      headers["Content-Type"] = contentType
    }

    return new Promise((resolve,reject)=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`,{
        method: 'POST',
        body:data,
        headers:headers
      })
      .then(response=>response.json())
      .then((json)=>{
        resolve(json)
      })
      .catch((error)=>{
        reject(error)
      })
    })
  }}

export default apiService;