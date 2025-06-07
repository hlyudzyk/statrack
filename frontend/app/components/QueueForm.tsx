import { signIn, useSession } from "next-auth/react";
import CustomButton from "@/app/components/forms/CustomButton";
import {Datepicker} from "flowbite-react";
import InputField from "@/app/components/forms/InputField";
import React, {useState, useEffect} from "react";
import {QueueEntry, User} from "@/app/lib/types";
import {getAvailableUsers} from "@/app/lib/userActions";
import Loader from "@/app/components/Loader";
import {
  getQueueEntriesByUser,
  getQueueEntriesByUserPublic,
  joinQueue
} from "@/app/lib/queueActions";
import {FcCheckmark} from "react-icons/fc";
import TimePickerPanel from "@/app/components/forms/TimePickerPanel";

const QueueForm = () => {
  const { data: session, status } = useSession();
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("09:00");
  const [comment, setComment] = useState("");
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [queueEntries,setQueueEntries] = useState<QueueEntry[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAvailableUsers();
        if (!Array.isArray(response)) {
          setAvailableUsers([]);
          return;
        }
        setAvailableUsers(response);
      } catch (err) {
        setAvailableUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (status === "loading" || loading) return (<Loader/>);

  if (!session) {
    return (
        <div className="p-10">
          <h2 className="font-semibold text-2xl p-5">To continue please sign in with Google</h2>
          <CustomButton
              label="Sign in with Google"
              onClick={() => signIn("google")}
          />
        </div>
    );
  }

  const handleUserChange = async (e) => {
      const user = availableUsers.find((u) => u.id === e.target.value);
      setSelectedUser(user ?? null);
      setQueueEntries(await getQueueEntriesByUserPublic(user.id));
      console.log(queueEntries)
  }

  const handleJoinQueue = async () => {
    if (!selectedUser) {
      setMessage("Please select a user first");
      setMessageType("error");
      return;
    }

    const requestedTime = `${date.toISOString().split("T")[0]}T${time}`;

    const payload = new FormData();
    payload.append("studentEmail", session.user.email);
    payload.append("studentName", session.user.name);
    payload.append("requestedTime", requestedTime);
    payload.append("comment", comment);

    const response = await joinQueue(selectedUser.id, payload);

    if (response.message) {
      setMessage(response.message); // e.g. "Already in queue"
      setMessageType("error");
    } else {
      setMessage("Запит надіслано успішно!");
      setMessageType("success");
    }
  };


  return (
      <div className="p-10 space-y-4">
        <h1 className="text-2xl font-semibold">Запит про консультацію</h1>
        <h3 className="text-xl">Ви ввійшли як <span className="font-semibold">{session.user.name}</span></h3>

        <label className="block text-sm text-gray-700">Викладач/-ка</label>
        <select
            className="border rounded w-full"
            value={selectedUser?.id ?? ""}
            onChange={(e) => handleUserChange(e)}
        >
          <option value="">-- Виберіть викладача --</option>
          {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} {user.lastname} ({user.email})
              </option>
          ))}
        </select>
        {selectedUser&&selectedUser.queueComment&&(<InputField label="Примітка від викладача" value={selectedUser.queueComment} readonly={true} onChange={()=>{}}/>)}
        <div className="flex flex-row space-x-2">
          <Datepicker
              language="uk"
              value={date}
              onChange={setDate}
          />
          <TimePickerPanel value={time} onChange={setTime} bookedTimes={queueEntries}/>
        </div>


        <InputField label="Ваша електронна адреса" value={session.user.email} readonly={true} onChange={()=>{}}/>
        <InputField label="Додайте примітку (необов'язково)" value={comment} onChange={(e)=>setComment(e.target.value)}/>

        <CustomButton
            label="Надіслати запит"
            onClick={handleJoinQueue}
        />
        {message && (
            <div className={`p-4 rounded-xl flex flex-row font-medium text-white ${messageType === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
              {message}
            </div>
        )}

      </div>
  );
};

export default QueueForm;