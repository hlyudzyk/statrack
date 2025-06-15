'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";
import {handleLogin} from "@/app/lib/actions";
import CustomButton from "@/app/components/forms/CustomButton";
import {authenticate} from "@/app/lib/authService";
import Loader from "@/app/components/Loader";
import {useUser} from "@/app/lib/context/UserContext";
import {getUserData} from "@/app/lib/userActions";

const LoginPage = () => {
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errors,setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {user, setUser} = useUser();
  const submitLogin = async () => {
    setLoading(true);
    setErrors([]);
    const formData = { email, password };

    const response = await authenticate(JSON.stringify(formData));

    if (response.access_token) {
      await handleLogin(response.id, response.access_token, response.refresh_token);
      const userData = await getUserData(response.id);
      setUser(userData);
      setTimeout(() => {
        router.push('/');
      }, 0);
    } else if (response.message) {
      try {
        const parsedErrors = JSON.parse(response.message);
        const tmpErrors: string[] = Object.values(parsedErrors);
        setErrors(tmpErrors);
      } catch (err) {
        setErrors([response.message]);
      }
    }
    setLoading(false);
  };

  if(loading){
    return <Loader/>;
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
                  Введіть дані для входу в Ваш обліковий запис
                </h2>
              </header>

              {/* Form Section */}
              <section className="p-6 2xl:p-10 3xl:p-16">
                <form onSubmit={submitLogin} className="space-y-6 2xl:space-y-8 3xl:space-y-10">

                  {/* Email input */}
                  <input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ваша електронна адреса"
                      type="email"
                      className="w-full h-[64px] 2xl:h-[80px] 3xl:h-[100px] px-6 2xl:px-8 3xl:px-10 text-xl 2xl:text-2xl 3xl:text-5xl border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  {/* Password input */}
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ваш пароль"
                      type="password"
                      className="w-full h-[64px] 2xl:h-[80px] 3xl:h-[100px] px-6 2xl:px-8 3xl:px-10 text-xl 2xl:text-2xl 3xl:text-5xl border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />

                  {errors.map((error, index) => (
                      <div
                          className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                          key={`error_${index}`}
                          data-testid={`error-${index}`}
                      >
                        {error}
                      </div>
                  ))}


                  {/* Submit button */}
                  <CustomButton
                      label="Вхід"
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