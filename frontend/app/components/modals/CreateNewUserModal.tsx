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
  const [role, setRole] = useState(roleOptions[0].value);
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [errors, setErrors] = useState<string[]>([]);

  const canSubmit = () => {
    return email&&firstname&&role&&lastname;
  }
  const submitSignup = async () => {
    setErrors([]);

    const formData = {
      firstname,
      lastname,
      email,
      birthday,
      role: role,
    };

    const response = await registerUser(formData);

    if (response.message) {
      try {
        const parsedErrors = JSON.parse(response.message);
        const tmpErrors: string[] = Object.values(parsedErrors);
        setErrors(tmpErrors);
      } catch (err) {
        setErrors([response.message]);
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
      <form onSubmit={(e) => {
        e.preventDefault();
        submitSignup();
      }} className="space-y-4">
        <input
            data-testid="input-firstname"
            onChange={handleChangeWithClear(setFirstname)}
            placeholder="Ім'я"
            type="text"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
            data-testid="input-lastname"
            onChange={handleChangeWithClear(setLastname)}
            placeholder="Прізвище"
            type="text"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
            data-testid="input-email"
            onChange={handleChangeWithClear(setEmail)}
            placeholder="Електронна адреса"
            type="email"
            className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <div data-testid="select-role">
          <RoleSelect
              value={roleOptions[0]}
              onChange={(role) => {
                setErrors([]);
                setRole(role.value);
              }}
              disabled={false}
          />
        </div>
        <div data-testid="datepicker-birthday">
          <Datepicker
              value={birthday}
              onChange={(date) => {
                setErrors([]);
                handleDateChange(date);
              }}
              placeholder="Дата народження"
          />
        </div>

        {errors.map((error, index) => (
            <div
                className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                key={`error_${index}`}
                data-testid={`error-${index}`}
            >
              {error}
            </div>
        ))}

        <div>
          <CustomButton label="Додати викладача" onClick={submitSignup} data-testid="submit-user-button" disabled={!canSubmit()}/>
        </div>
      </form>

  );

  return (
      <Modal
          label="Додати викладача"
          close={signupModal.close}
          content={content}
          isOpen={signupModal.isOpen}
      />
  );
};

export default CreateNewUserModal;
