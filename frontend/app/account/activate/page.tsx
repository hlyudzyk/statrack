'use client'
import {useState} from "react";
import {useSearchParams} from "next/navigation";
import CustomButton from "@/app/components/forms/CustomButton";


const ActivateAccount = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    setError("");

  };

  const handleActivateAccount = (e) => {
    if(password!=repeatPassword){
      setError("Passwords don't match")
      return;
    }
    e.preventDefault();
    if (password === repeatPassword) {
      setStatus('Account activated!');
    } else {
      setStatus('Passwords do not match.');
    }
  };

  return (
      <div className="flex items-center justify-center fixed inset-0 ">
        <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
          <div className="translate duration-600 h-full translate-y-0 opacity-100  rounded-2xl shadow-2xl">
            <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
              <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                <h2 className="text-lg font-bold">Activate your account</h2>
              </header>
              <section className="p-6">
                <form onSubmit={handleActivateAccount} className="space-y-4">
                  <input
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      type="password"
                      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                  />
                  <input
                      onChange={handleRepeatPasswordChange}
                      placeholder="Repeat password"
                      type="password"
                      className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                  />
                  {error &&
                    <div className="p-5 bg-red-500 text-white rounded-xl opacity-80">
                      {error}
                    </div>
                  }

                  <CustomButton label="Activate account" onClick={handleActivateAccount}
                                className="your-button-class"/>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
  );
}
export default ActivateAccount;