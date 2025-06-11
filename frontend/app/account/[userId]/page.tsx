'use client'

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {AccountPageSkeleton} from "@/app/components/skeletons";
import {useParams} from "next/navigation";
import InputField from "@/app/components/forms/InputField";
import {
  Datepicker,
  HR, RangeSlider,
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelinePoint, TimelineTime, TimelineTitle
} from "flowbite-react";
import {getUserData, updateUserData} from "@/app/lib/userActions";
import {QueueEntry, User} from "@/app/lib/types";
import RoleSelect from "@/app/components/forms/RoleSelect";
import {roleOptions} from "@/app/lib/constants";
import {ImageUploader} from "@/app/components/forms/ImageUploader";
import {useUser} from "@/app/lib/context/UserContext";
import {HiCalendar} from "react-icons/hi";
import {getQueueEntriesByUser} from "@/app/lib/queueActions";
import {format} from "date-fns";
import {uk} from "date-fns/locale";
import CustomButton from "@/app/components/forms/CustomButton";


const AccountPage = () => {
  const params = useParams<{ userId: string }>()
  const userId = params.userId;
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [image,setImage] = useState<File|null>(null);
  const {user, setUser} = useUser();
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);

  const editMode = () => {
    return fetchedUser?.id===user?.id;
  }

  const isAdmin = () => {
    return user?.role==="ADMIN";
  }


  const formatDate = (date: Date) => {
    return format(date, "EEEE, d MMMM yyyy 'о' HH:mm", { locale: uk });
  };

  const getMaxDate: () => Date = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setFetchedUser(await getUserData(userId));
        const qe = await getQueueEntriesByUser(userId);
        setQueueEntries(qe);
      } catch (err) {
        console.log(err)
        setStatus("error")
      } finally {
        setStatus("idle");
      }
    };
    fetchData();

  },[userId])

  const handleSave = async () => {
    setStatus('loading');
    const formData = new FormData();
    if (fetchedUser==null){return;}

    formData.append('firstname', fetchedUser.firstname);
    formData.append('lastname', fetchedUser.lastname);
    formData.append('birthday', fetchedUser.birthday);
    formData.append('role', fetchedUser.role);
    formData.append('queueSize', String(fetchedUser.queueSize));
    formData.append('queueComment', fetchedUser.queueComment);

    if(image!==null){
      formData.append('image', image);
    }

    setFetchedUser(await updateUserData(fetchedUser.id, formData));
    setStatus("success");
  };

  const handleSliderChange = (e) => {
    setFetchedUser({ ...fetchedUser, queueSize: e.target.value });
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
                      src={fetchedUser.avatarUrl || `/no_pfp.png`}
                      className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
              {editMode() && (
                  <ImageUploader onImageSelected={(file) => setImage(file)} withDropBox={false}/>
              )}
            </div>

            <div className="w-full pt-20">
              <h2 data-testid="allowed-action-label"
                  className="mb-6 text-2xl">{editMode() ? "Ваш обліковий запис" : "Обліковий запис користувача"}</h2>

              <InputField
                  label="Ім'я"
                  value={fetchedUser.firstname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!fetchedUser) return;
                    setFetchedUser({...fetchedUser, firstname: e.target.value});
                  }}
                  readonly={!editMode()}
              />

              <InputField
                  label="Прізвище"
                  value={fetchedUser.lastname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!fetchedUser) return;
                    setFetchedUser({...fetchedUser, lastname: e.target.value});
                  }}
                  readonly={!editMode()}
              />
              <InputField
                  label="Електронна адреса"
                  value={fetchedUser.email}
                  onChange={() => {
                  }}
                  readonly={true}
              />

              <RoleSelect
                  value={roleOptions.find(o => o.value === fetchedUser?.role) ?? roleOptions[0]}
                  onChange={(role) => {
                    if (!fetchedUser) return;
                    setFetchedUser({...fetchedUser, role: role.value});
                  }} disabled={!isAdmin()}
              />
              <HR/>
              <div className="space-y-2">
              <p>Дата народження</p>
              <Datepicker
                  language="uk"
                  maxDate={getMaxDate()}
                  value={new Date(fetchedUser.birthday)}
                  onChange={(date) => {
                    if (!fetchedUser) return;
                    const formatted = date.toISOString().split('T')[0];
                    setFetchedUser({...fetchedUser, birthday: formatted});
                  }}
                  disabled={!editMode()}
              />
              </div>
              <HR/>
            </div>

            {editMode() && (
                <div>
                <div className="space-y-2">
                  <label htmlFor="queue-range" className="block text-sm font-medium text-gray-700">
                    Кількісь консультацій на день: <span className="font-bold">{fetchedUser.queueSize}</span>
                  </label>
                  <RangeSlider
                      id="queue-range"
                      min={0}
                      max={10}
                      value={fetchedUser.queueSize}
                      onChange={handleSliderChange}
                  />
                </div>
              <InputField label="Додаткова інформація для студентів" value={fetchedUser.queueComment || ""} onChange={
            (e) => setFetchedUser({...fetchedUser, queueComment: e.target.value})
          }/>
                </div>
          )}

          {(isAdmin() || editMode()) && (
          <CustomButton label="Зберегти зміни" onClick={handleSave}/>
          )}

          {status === 'success' && (
          <div className="mt-4 bg-green-500 rounded-xl text-white p-5">
                  Зміни збережено!
                </div>
            )}

            {status === 'error' && (
                <div className="mt-4 text-red-600">
                  Виникла помилка. Будь ласка повторіть знову
                </div>
            )}
          </div>
        </div>

        {editMode()&&(<div className="p-6 rounded-xl border-gray-300 shadow-xl mt-20">
          <h1 className="my-6 text-2xl">Черга консультацій на сьогодні</h1>
          <div className="mt-4">
            <Timeline>
              {queueEntries.map((qe)=>
                  (<TimelineItem key={qe.id} color="red">
                        <TimelinePoint icon={HiCalendar} />
                        <TimelineContent>
                          <TimelineTime>{formatDate(new Date(qe.scheduledTime))}</TimelineTime>
                          <TimelineTitle>{qe.studentName}</TimelineTitle>
                          <TimelineContent>
                            <div className="flex flex-col">
                              <p className="font-semibol">{qe.studentEmail}</p>
                              <p>{qe.comment || ""}</p>
                            </div>
                          </TimelineContent>
                        </TimelineContent>
                      </TimelineItem>
                  )
              )
              }
            </Timeline>
          </div>
        </div>)}
      </main>
  ) : (
      <AccountPageSkeleton />
  );
};

export default AccountPage;