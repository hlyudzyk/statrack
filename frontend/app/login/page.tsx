'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {handleLogin} from "@/app/lib/actions";
import CustomButton from "@/app/components/forms/CustomButton";
import {ApiError} from "@/app/lib/types";
import {authenticate} from "@/app/lib/authService";

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

    const response = await authenticate(JSON.stringify(formData))
    if(response.access_token){
      await handleLogin(response.id, response.access_token, response.refresh_token);
      router.push('/')
    } else {
      setError(response);
    }
  }

  return (
      <div className="flex items-center justify-center fixed inset-0 bg-white dark:bg-gray-900">
        <div className="relative w-[90%] md:w-[70%] 2xl:w-[50%] 3xl:w-[40%] my-10 mx-auto">
          <div className="h-full rounded-3xl shadow-2xl bg-white dark:bg-gray-800">
            <div className="w-full flex flex-col">

              {/* Header */}
              <header
                  className="h-[80px] 2xl:h-[100px] 3xl:h-[120px] flex items-center justify-center border-b p-6 2xl:p-8 3xl:p-10">
                <h2 className="text-2xl 2xl:text-3xl 3xl:text-6xl font-bold text-center text-gray-900 dark:text-white">
                  Log in to your account
                </h2>
              </header>

              {/* Form Section */}
              <section className="p-6 2xl:p-10 3xl:p-16">
                <form onSubmit={submitLogin} className="space-y-6 2xl:space-y-8 3xl:space-y-10">

                  {/* Email input */}
                  <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your e-mail address"
                      type="email"
                      className="w-full h-[64px] 2xl:h-[80px] 3xl:h-[100px] px-6 2xl:px-8 3xl:px-10 text-xl 2xl:text-2xl 3xl:text-5xl border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  {/* Password input */}
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      type="password"
                      className="w-full h-[64px] 2xl:h-[80px] 3xl:h-[100px] px-6 2xl:px-8 3xl:px-10 text-xl 2xl:text-2xl 3xl:text-5xl border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  {/* Error message */}
                  {error && (
                      <div
                          className="p-6 2xl:p-8 3xl:p-10 bg-red-600 text-white text-base 2xl:text-2xl 3xl:text-4xl rounded-xl opacity-90"
                          key={`error_${error.code}`}>
                        {error.message}
                      </div>
                  )}

                  {/* Submit button */}
                  <CustomButton
                      label="Log in"
                      onClick={submitLogin}
                      className="w-full text-xl 2xl:text-2xl 3xl:text-5xl py-4 2xl:py-6 3xl:py-8 px-6 2xl:px-8 3xl:px-10 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                  />
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>

  );
}

export default LoginPage;