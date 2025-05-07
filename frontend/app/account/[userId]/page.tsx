'use client'

import {useState, useEffect} from 'react';
import Image from 'next/image';
import {AccountPageSkeleton} from "@/app/components/skeletons";
import {useParams} from "next/navigation";
import InputField from "@/app/components/forms/InputField";
import {Datepicker, HR} from "flowbite-react";
import {getUserData, updateUserData} from "@/app/lib/userActions";
import {User} from "@/app/lib/types";
import RoleSelect from "@/app/components/forms/RoleSelect";
import {roleOptions} from "@/app/lib/constants";
import {ImageUploader} from "@/app/components/forms/ImageUploader";
import {useUser} from "@/app/lib/context/UserContext";
import UserStatusTimeline from "@/app/components/UserStatusTimeline";


const AccountPage = () => {
  const params = useParams<{ userId: string }>()
  const userId = params.userId;
  const {currentUser, setCurrentUser} = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [image,setImage] = useState<File|null>(null);

  const editMode = () => {
    console.log(user?.id);
    console.log(currentUser?.id)

    return user?.id===currentUser?.id;
  }

  const fetchUser = async () => {
      setUser(await getUserData(userId));
  }

  const getMaxDate: () => Date = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }

  useEffect(()=>{
    fetchUser()
  },[userId])

  const handleSave = async () => {
    setStatus('loading');
    const formData = new FormData();
    if (user==null){return;}

    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('birthday', user.birthday);
    formData.append('role', user.role);
    formData.append('image', image);

    setUser(await updateUserData(user.id, formData));
  };

  return user ? (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
          <div className="lg:w-[50%] sm:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center md:justify-start">
                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
                  <Image
                      width={200}
                      height={200}
                      alt="Profile image"
                      src={user.avatarUrl?`${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}`:`/no_pfp.png`}
                      className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
              {editMode() && (
                  <ImageUploader onImageSelected={(file) => setImage(file)} withDropBox={false}/>
              )}
            </div>

            <div className="w-full pt-20">
              <h2 className="mb-6 text-2xl">{editMode()?"Describe yourself":"User's personal data"}</h2>

              <InputField
                  label="Firstname"
                  value={user.firstname}
                  onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                  readonly={!editMode()}
              />

              <InputField
                  label="Lastname"
                  value={user.lastname}
                  onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                  readonly={!editMode()}
              />

              <RoleSelect
                  value={roleOptions.find(o => o.value === user.role)}
                  onChange={(role) => setUser({ ...user, role: role.value })}
                  disabled={!editMode()}
              />
              <HR/>
              <Datepicker
                  defaultValue={new Date(user.birthday)}
                  maxDate={getMaxDate()}
                  onChange={(date) => {
                    const formatted = date.toISOString().split('T')[0];
                    setUser({ ...user, birthday: formatted });
                  }}
                  disabled={!editMode()}
              />

            </div>

            {editMode() && (<button
                onClick={handleSave}
                className="cursor-pointer bg-lightbase hover:bg-lightbase-hover p-5 text-white rounded-xl mt-4"
            >
              Save Changes
            </button>)}

            {status === 'success' && (
                <div className="mt-4 bg-green-500 rounded-xl text-white p-5">
                  Changes saved successfully!
                </div>
            )}

            {status === 'error' && (
                <div className="mt-4 text-red-600">
                  There was an error saving changes. Please try again.
                </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-xl border-gray-300 shadow-xl mt-20">
          <h1 className="my-6 text-2xl">Activity</h1>
          <div className="mt-4 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <UserStatusTimeline/>
          </div>
        </div>
      </main>
  ) : (
      <AccountPageSkeleton />
  );
};

export default AccountPage;