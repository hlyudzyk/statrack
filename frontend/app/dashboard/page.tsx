'use client'
import StatusForm from "@/app/components/forms/StatusForm";
import UserStatusTimeline from "@/app/components/UserStatusTimeline";

const Dashboard = async () => {
  return(
      <div>
        <h3 className="text-2xl"> Dashboard </h3>

        <StatusForm/>
        <div className="pt-10">
          <h3 className="text-2xl pb-5"> Your activity today </h3>
          <UserStatusTimeline/>
        </div>
      </div>
  )
}

export default Dashboard;