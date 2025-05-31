import { signIn, useSession } from "next-auth/react";
import CustomButton from "@/app/components/forms/CustomButton";
import {Datepicker} from "flowbite-react";
import InputField from "@/app/components/forms/InputField";
import {useState, useEffect} from "react";
import {User} from "@/app/lib/types";
import {getAvailableUsers} from "@/app/lib/userActions";
import Loader from "@/app/components/Loader";
import {joinQueue} from "@/app/lib/queueActions";

const QueueForm = () => {
  const { data: session, status } = useSession();
  const [date, setDate] = useState<Date>(new Date());
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
      alert("Please select a user first");
      return;
    }

    const requestedTime = `${date.toISOString().split("T")[0]}T09:00`;

    const payload = new FormData();
    payload.append("studentEmail", session.user.email);
    payload.append("studentName", session.user.name);
    payload.append("requestedTime", requestedTime)

    console.log("Joining queue for", selectedUser.firstname, selectedUser.lastname);
    await joinQueue(selectedUser.id,payload);
  };

  return (
      <div className="p-10 space-y-4">
        <p>Signed in as {session.user.name}</p>

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

        <Datepicker
            value={date}
            onChange={setDate}
        />

        <InputField label="Email" value={session.user.email} readonly={true} />
        <InputField label="Add comment (optional)" />

        <CustomButton
            label="Join Queue"
            onClick={handleJoinQueue}
            variant="success"
        />
      </div>
  );
};

export default QueueForm;