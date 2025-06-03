'use client'
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import CustomButton from "@/app/components/forms/CustomButton";
import {handleLogin} from "@/app/lib/actions";
import {activateAccountRequest, validateTokenRequest} from "@/app/lib/authService";
import {getUserData} from "@/app/lib/userActions";
import {useUser} from "@/app/lib/context/UserContext";


const ActivateAccount = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user, setUser} = useUser();
  const router = useRouter();


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    setError("");

  };

  const handleActivateAccount = async () => {
    if (password != repeatPassword) {
      setError("Паролі не збігаються")
      return;
    }
    if (password === repeatPassword) {
      const response = await activateAccountRequest(token,password);
      if(response.access_token){
        await handleLogin(response.id, response.access_token, response.refresh_token);
        const userData = await getUserData(response.id);
        setUser(userData);
        router.push('/');
      }
    } else {

    }
  };


  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await validateTokenRequest(token);
        if (response.status === 200) {
          setValid(true);
        } else {

          setValid(false);
        }
      } catch (error) {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setValid(false);
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Перевірка токену активації...</div>;
  }

  if (valid) {
    return (
        <div className="flex items-center justify-center fixed inset-0 ">
          <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
            <div className="translate duration-600 h-full translate-y-0 opacity-100 rounded-2xl shadow-2xl">
              <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
                <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                  <h2 className="text-lg font-bold">Активація акаунту</h2>
                </header>
                <section className="p-6">
                  <form onSubmit={handleActivateAccount} className="space-y-4">
                    <input
                        onChange={handlePasswordChange}
                        placeholder="Пароль"
                        type="password"
                        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    />
                    <input
                        onChange={handleRepeatPasswordChange}
                        placeholder="Повторіть пароль"
                        type="password"
                        className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    />
                    {error && (
                        <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
                          {error}
                        </div>
                    )}
                    <CustomButton label="Активувати акаунт" onClick={handleActivateAccount} />
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return <div>Недійсний токен активації. Якщо виникла проблема, будь ласка зв'яжіться з адміністратором</div>;

}
export default ActivateAccount;