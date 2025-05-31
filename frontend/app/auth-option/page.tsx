"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CustomButton from "@/app/components/forms/CustomButton";
import QueueForm from "@/app/components/QueueForm";
import {SessionProvider} from "next-auth/react";

const UnauthenticatedOptions = () => {
  const [view, setView] = useState<"teacher" | "student" | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (view === "teacher") {
      router.push("/login");
    }
  }, [view, router]);

  if (view === "student") {
    return (
        <SessionProvider>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <QueueForm />
        </div>
        </SessionProvider>
    );
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Welcome! How would you like to proceed?
        </h1>
        <div className="space-y-6 w-full max-w-md">
          <CustomButton
              label="I'm a Teacher"
              onClick={() => setView("teacher")}
              className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          />
          <CustomButton
              label="I'm a Student"
              onClick={() => setView("student")}
              className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700"
          />
        </div>
      </div>
  );
};

export default UnauthenticatedOptions;
