'use client'

import {useState} from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import {useRouter} from "next/navigation";
import {handleLogin} from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errors,setErrors] = useState<string[]>([])

  const submitLogin = async()=>{
    const formData = {
      email:email,
      password:password
    }

    const response = await apiService.postWithoutToken('api/v1/auth/authenticate',JSON.stringify(formData))
    if(response.access_token){
      await handleLogin(response.id, response.access_token, response.refresh_token);
      loginModal.close();
      router.push('/')
    } else {
      setErrors(response.non_field_errors);
    }
  }

  const content = (
      <>
        <form
            action={submitLogin}
            className="space-y-4">
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>

            {errors.map((error, index) => {
                  return (
                      <div className="p-5 bg-lightbase text-white rounded-xl opacity-80"
                           key={`error_${index}`}>
                        {error}
                      </div>
                  )
                }
            )
            }
            <CustomButton label="Log in" onClick={submitLogin}/>
        </form  >
      </>
  )

  return(
      <Modal label="Log in" close={loginModal.close} content={content} isOpen={loginModal.isOpen}/>
  )
}

export default LoginModal;