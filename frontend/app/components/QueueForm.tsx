import { signIn, useSession } from "next-auth/react";
import CustomButton from "@/app/components/forms/CustomButton";
import {Datepicker} from "flowbite-react";
import InputField from "@/app/components/forms/InputField";
import React, {useState, useEffect} from "react";
import {User} from "@/app/lib/types";
import {getAvailableUsers} from "@/app/lib/userActions";
import Loader from "@/app/components/Loader";
import {joinQueue} from "@/app/lib/queueActions";
import {FcCheckmark} from "react-icons/fc";

const QueueForm = () => {
  const { data: session, status } = useSession();
  const [date, setDate] = useState<Date>(new Date());
  const [comment, setComment] = useState("");
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

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
  const handleJoinQueue = async () => {
    if (!selectedUser) {
      setMessage("Please select a user first");
      setMessageType("error");
      return;
    }

    const requestedTime = `${date.toISOString().split("T")[0]}T09:00`;

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
      setMessage("Successfully joined the queue!");
      setMessageType("success");
    }
  };


  return (
      <div className="p-10 space-y-4">
        <h3 className="font-semibold text-xl">Signed in as {session.user.name}</h3>

        <label className="block text-sm font-medium text-gray-700">Select Teacher</label>
        <select
            className="border rounded p-2 w-full"
            value={selectedUser?.id ?? ""}
            onChange={(e) => {
              const user = availableUsers.find((u) => u.id === e.target.value);
              setSelectedUser(user ?? null);
            }}
        >
          <option value="">-- Select a user --</option>
          {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} {user.lastname} ({user.email})
              </option>
          ))}
        </select>

        <div className="flex flex-row space-x-2">
          <Datepicker
              value={date}
              onChange={setDate}
          />
          <input
              type="time"
              id="time"
              min={0}
              max={5}
              value={1}
              onChange={()=>{}}
              required
              className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>


        <InputField label="Email" value={session.user.email} readonly={true}/>
        <InputField label="Add comment (optional)" value={comment} onChange={(e)=>setComment(e.target.value)}/>

        <CustomButton
            label="Join Queue"
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