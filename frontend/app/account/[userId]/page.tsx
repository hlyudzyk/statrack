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
import UserStatusTimeline from "@/app/components/UserStatusTimeline";
import {useUser} from "@/app/lib/context/UserContext";


const AccountPage = () => {
  const params = useParams<{ userId: string }>()
  const userId = params.userId;
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [image,setImage] = useState<File|null>(null);
  const {user, setUser} = useUser();

  const editMode = () => {
    console.log(user?.id)
    return fetchedUser?.id===user?.id || user?.role==="ADMIN";
  }

  const fetchUser = async () => {
      setFetchedUser(await getUserData(userId));
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
    if (fetchedUser==null){return;}

    formData.append('firstname', fetchedUser.firstname);
    formData.append('lastname', fetchedUser.lastname);
    formData.append('birthday', fetchedUser.birthday);
    formData.append('role', fetchedUser.role);
    if(image!==null){
      formData.append('image', image);
    }

    setFetchedUser(await updateUserData(fetchedUser.id, formData));
  };

  return fetchedUser ? (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <div className="flex flex-col items-center p-6 rounded-xl border-gray-300 shadow-xl">
          <div className="lg:w-[50%] sm:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center md:justify-start">
                <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
                  <Image
                      priority={false}
                      width={200}
                      height={200}
                      alt="Profile image"
                      src={fetchedUser.avatarUrl?`${process.env.NEXT_PUBLIC_API_URL}${fetchedUser.avatarUrl}`:`/no_pfp.png`}
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
                  value={fetchedUser.firstname}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, firstname: e.target.value })}
                  readonly={!editMode()}
              />

              <InputField
                  label="Lastname"
                  value={fetchedUser.lastname}
                  onChange={(e) => setFetchedUser({ ...fetchedUser, lastname: e.target.value })}
                  readonly={!editMode()}
              />

              <InputField
                  label="Email"
                  value={fetchedUser.email}
                  onChange={()=>{}}
                  readonly={true}
              />

              <RoleSelect
                  value={roleOptions.find(o => o.value === fetchedUser.role)}
                  onChange={(role) => setFetchedUser({ ...fetchedUser, role: role.value })}
                  disabled={!editMode()}
              />
              <HR/>
              <Datepicker
                  maxDate={getMaxDate()}
                  onChange={(date) => {
                    const formatted = date.toISOString().split('T')[0];
                    setFetchedUser({ ...fetchedUser, birthday: formatted });
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
          <div className="mt-4">
            <UserStatusTimeline/>
          </div>
        </div>
      </main>
  ) : (
      <AccountPageSkeleton />
  );
};

export default AccountPage;