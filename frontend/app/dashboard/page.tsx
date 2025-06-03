'use client'

import {useUser} from "@/app/lib/context/UserContext";
import {statusOptions, UserStatus} from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {changeUserStatus} from "@/app/lib/userActions";
import UserStatusTimeline from "@/app/components/UserStatusTimeline";
import { useEffect, useState } from "react";
import { Modal, TextInput, Button } from "flowbite-react";

const Dashboard = () => {
  const { user, setUser } = useUser();
  const [status, setStatus] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (user?.status) {
      setStatus(user.status);
    }
  }, [user]);

  const getButtonStyle = (status: UserStatus) => {
    switch (status) {
      case UserStatus.OFFLINE:
        return "danger";
      case UserStatus.ON_BREAK:
        return "warning";
      case UserStatus.ONLINE:
        return "success";
    }
  };

  const statusTranslations: Record<UserStatus, string> = {
    ONLINE: "Присутній",
    ON_BREAK: "На перерві",
    OFFLINE: "Відсутній",
  };

  const confirmStatusChange = async () => {
    if (!user) return;

    const payload = {
      status: selectedStatus,
      comment: comment || null,
    };

    try {
      const data = await changeUserStatus(user.id, JSON.stringify(payload));
      setUser({ ...user, status: data.status });
      setStatus(data.status);
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
      setComment("");
    }
  };

  const openModal = (newStatus: string) => {
    setSelectedStatus(newStatus);
    setShowModal(true);
  };

  return (
      <div className="space-y-6 bg-gray-200 w-full p-12 rounded-2xl">
        <h3 className="text-3xl font-semibold">Панель</h3>
        <h4 className="text-xl text-gray-700">
          Ласкаво просимо, {user?.firstname} {user?.lastname}! Ваш статус зараз: {user?.status ? statusTranslations[user.status] : "Невідомо"}.
        </h4>
        <h4 className="text-md text-gray-700">Змінити статус?</h4>

        <div className="flex flex-wrap gap-4 justify-start">
          {statusOptions.filter(s => s.value !== user?.status).map((s) => (
              <CustomButton
                  key={s.value}
                  label={s.label}
                  variant={getButtonStyle(s.value)}
                  onClick={() => openModal(s.value)}
                  className="w-auto min-w-[120px] max-w-2xl"
              />
          ))}
        </div>

        <div className="pt-12 md:pl-10">
          <h3 className="text-2xl font-semibold pb-6">Ваші записи активності</h3>
          <UserStatusTimeline />
        </div>

        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Змінити статус на <span className="font-bold">{selectedStatus}</span>?
              </h3>
              <TextInput
                  placeholder="Додаткова інформація (необов'язково)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end gap-4">
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Скасувати
                </Button>
                <Button color="blue" onClick={confirmStatusChange}>
                  Підтверити
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
  );
};

export default Dashboard;
