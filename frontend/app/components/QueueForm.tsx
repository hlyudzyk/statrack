import { signIn, signOut, useSession } from "next-auth/react";
import {Blocks} from "react-loader-spinner";
import CustomButton from "@/app/components/forms/CustomButton";
import {Datepicker} from "flowbite-react";
import InputField from "@/app/components/forms/InputField";

const QueueForm = () => {
  const { data: session, status } = useSession();

  // if (status === "loading") return (<Blocks
  //     height="80"
  //     width="80"
  //     color="#4fa94d"
  //     ariaLabel="blocks-loading"
  //     wrapperStyle={{}}
  //     wrapperClass="blocks-wrapper"
  //     visible={true}
  // />);
  //
  // if (!session) {
  //   return <CustomButton
  //       label="Sign in with Google"
  //       onClick={() => signIn("google")}
  //
  //   />;
  // }

  const handleJoinQueue = async () => {
    console.log(session.user.email)
    console.log(session.user.name)
    // const res = await fetch("/api/queue-entry", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: session.user.name,
    //     email: session.user.email,
    //   }),
    // });
  };

  return (
      <div className="p-10">
        {/*<p>Signed in as {session.user.email}</p>*/}
        <p>Signed in as John Cena</p>
        <Datepicker/>
        <InputField label="Email" value="johncena@example.com" readonly={true}/>
        <InputField label="Add comment (optional)"/>
        <CustomButton label="Join Queue" onClick={handleJoinQueue} variant="success"/>
      </div>
  );
};

export default QueueForm;