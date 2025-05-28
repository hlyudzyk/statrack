'use client'

import {useState} from "react";
import Modal from "@/app/components/modals/Modal";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import RoleSelect from "@/app/components/forms/RoleSelect";
import {Datepicker} from "flowbite-react";
import {roleOptions} from "@/app/lib/constants";
import {registerUser} from "@/app/lib/userActions";

const CreateNewUserModal = () => {
  const signupModal = useSignupModal();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState(roleOptions[0]);
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = async () => {
    // 🔹 Clear old errors before sending new request
    setErrors([]);

    const formData = {
      firstname,
      lastname,
      email,
      birthday,
      role: role.value,
    };

    const response = await registerUser(formData);

    if (response.message) {
      try {
        const parsedErrors = JSON.parse(response.message);
        const tmpErrors: string[] = Object.values(parsedErrors);
        setErrors(tmpErrors);
      } catch (err) {
        setErrors(['Unexpected error occurred.']);
      }
    } else {
      signupModal.close();
    }
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const handleChangeWithClear = (setter) => (e) => {
    setErrors([]);
    setter(e.target.value);
  };

  const content = (
      <form onSubmit={(e) => { e.preventDefault(); submitSignup(); }} className="space-y-4">
        <input
            onChange={handleChangeWithClear(setFirstname)}
            placeholder="User's firstname"
            type="text"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
            onChange={handleChangeWithClear(setLastname)}
            placeholder="User's lastname"
            type="text"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
            onChange={handleChangeWithClear(setEmail)}
            placeholder="User's e-mail address"
            type="email"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <RoleSelect
            value={roleOptions[0]}
            onChange={(role) => {
              setErrors([]);
              setRole(role.value);
            }}
            disabled={false}
        />
        <Datepicker
            onChange={(date) => {
              setErrors([]);
              handleDateChange(date);
            }}
            placeholder="User's birthday"
        />

        {errors.map((error, index) => (
            <div
                className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                key={`error_${index}`}
            >
              {error}
            </div>
        ))}

        <CustomButton label="Register user" onClick={submitSignup} />
      </form>
  );

  return (
      <Modal
          label="Register user"
          close={signupModal.close}
          content={content}
          isOpen={signupModal.isOpen}
      />
  );
};

export default CreateNewUserModal;
