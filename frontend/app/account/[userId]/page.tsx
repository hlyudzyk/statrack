'use client'

import {useState, useEffect, ChangeEvent, Suspense} from 'react';
import Image from 'next/image';
import {getUserId} from "@/app/lib/actions";
import {AccountPageSkeleton, PropertyListSkeleton} from "@/app/components/skeletons";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import apiService from "@/app/services/apiService";
import InputField from "@/app/components/forms/InputField";
import {Authority} from "@/app/components/Users";
import AuthorityList from "@/app/components/forms/AuthorityList";

export type UserType = {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
  birthday: string
  avatar_url: string
  description: string
  authorities: Authority[]
}

const AccountPage = () => {
  const params = useParams()
  const userId = params.userId;
  const [user, setUser] = useState<UserType>();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [birthday, setBirthday] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('/no_pfp.png');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const id = await getUserId();
      if (!id) {
        loginModal.open();
        router.push('/');
      }
      const userData: UserType = await apiService.get(`api/v1/users/${userId}`);
      setHasPermission(id===userId);
      setUser(userData);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setRole(userData.role);
      setBirthday(userData.birthday);
      setAvatarUrl(userData.avatar_url ? userData.avatar_url : '/no_pfp.png');
      setDescription(userData.description);
      setAuthorities(userData.authorities)
    };
    fetchUser();
  }, []);

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const image = event.target.files[0];
      setAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  };

  const handleSave = async () => {
    setStatus('loading');
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('role', role);
    if (avatar) formData.append('avatar', avatar);

    try {
      await apiService.put(`api/v1/users/${user?.id}`, formData);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return user && hasPermission ? (
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
                      src={avatarUrl}
                      className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="py-4 px-6 bg-lightbase hover:bg-lightbase-hover text-white rounded-xl flex justify-center md:justify-start">
                <label className="cursor-pointer">
                  <span className="text-sm md:text-base">Change Profile Image</span>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={setImage}
                      className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="w-full pt-20">
              <h2 className="mb-6 text-2xl">Describe yourself</h2>

              <InputField
                  label="Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
              />
              <InputField
                  label="Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
              />
              <InputField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  readonly={user.rol=="ROLE_ADMIN"}
              />
              <h1>Authority Management</h1>
              <AuthorityList authorities={authorities}/>

            </div>
            <button
                onClick={handleSave}
                className="cursor-pointer bg-lightbase hover:bg-lightbase-hover p-5 text-white rounded-xl mt-4"
            >
              Save Changes
            </button>

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
          <h1 className="my-6 text-2xl">My calendar</h1>

          <div className="mt-4 grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          </div>
        </div>
      </main>
  ) : (
      <AccountPageSkeleton />
  );
};

export default AccountPage;