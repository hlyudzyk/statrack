'use client'
import StatusForm from "@/app/components/forms/StatusForm";
import UserStatusTimeline from "@/app/components/UserStatusTimeline";
import {useUser} from "@/app/lib/context/UserContext";

const Dashboard = async () => {
  const {user, setUser} = useUser();

  return(
      <div>
        <h3 className="text-2xl"> Dashboard </h3>
        <h4 className="text-xl">Welcome back, {user?.firstname + user?.lastname}!</h4>
        <StatusForm/>
        <div className="pt-10">
          <h3 className="text-2xl pb-5"> Your activity today </h3>
          <UserStatusTimeline/>
        </div>
      </div>
  )
}

export default Dashboard;