'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import apiService from "@/app/services/apiService";
import RoleSelect from "@/app/components/forms/RoleSelect";
import {Datepicker} from "flowbite-react";
import {roleOptions} from "@/app/lib/constants";

const CreateNewUserModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const [email,setEmail] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [role,setRole] = useState(roleOptions[0]);
  const [birthday,setBirthday] = useState<Date>(new Date());
  const [errors,setErrors] = useState<string[]>([])

  const submitSignup = async () => {
    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      birthday: birthday,
      role: role
    }
    const response = await apiService.post('api/v1/users/register',JSON.stringify(formData), "application/json");

    if(response){
      signupModal.close();
    }
    else {
      const tmpErrors:string[] = Object.values(response).map((error:any)=>{
        return error;
      })
      setErrors(tmpErrors);
    }

  }

  const handleDateChange = (date) => {
    console.log(date);
    console.log("AAAAAAAA");

    setBirthday(date);
  };

  const content = (
      <form action={submitSignup} className="space-y-4">
        <input onChange={(e) => setFirstname(e.target.value)} placeholder="Users firstname"
               type="text" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
        <input onChange={(e) => setLastname(e.target.value)} placeholder="Users lastname"
               type="text" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Users e-mail address"
               type="email" className="w-full h-[54px] px-4  border border-gray-300 rounded-xl"/>
        <RoleSelect value={roleOptions[0]} onChange={(role) => setRole(role.value)} disabled={false}/>

        <Datepicker onChange={(date)=>handleDateChange(date)} placeholder="Users birthday"/>

        {errors.map((error, index) => {
              return (
                  <div className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                       key={`error_${index}`}>
                    {error}
                  </div>
              )
            }
        )
        }

        <CustomButton label="Register user" onClick={submitSignup}/>
      </form>
  )

  return (
      <Modal label="Register user" close={signupModal.close} content={content}
             isOpen={signupModal.isOpen}/>
  )
}

export default CreateNewUserModal;