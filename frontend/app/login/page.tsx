'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";
import apiService from "@/app/services/apiService";
import {handleLogin} from "@/app/lib/actions";
import CustomButton from "@/app/components/forms/CustomButton";
import {Toaster} from "@/app/components/Toaster";
import {ApiError} from "@/app/lib/types";

const LoginPage = () => {
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState<ApiError | null >(null)

  const submitLogin = async()=>{
    setError(null);
    const formData = {
      email:email,
      password:password
    }

    const response = await apiService.postWithoutToken('api/v1/auth/authenticate',JSON.stringify(formData))
    if(response.access_token){
      await handleLogin(response.id, response.access_token, response.refresh_token);
      router.push('/')
    } else {
      setError(response);
    }
  }

  return (
      <div className="flex items-center justify-center fixed inset-0 ">
        <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
          <div className="translate duration-600 h-full translate-y-0 opacity-100 rounded-2xl shadow-2xl">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                <h2 className="text-lg font-bold">Login into your account</h2>
              </header>
              <section className="p-6">
                <form onSubmit={submitLogin} className="space-y-4">
                  <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
                  <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
                  {error&&(<div className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                                key={`error_${error.code}`}>
                    {error.message}
                  </div>)}
                  <CustomButton label="Log in" onClick={submitLogin} className=""/>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginPage;