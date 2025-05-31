export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  birthday: string;
  avatarUrl: string;
  status: string;
  department: string;
  authorities: string[];
};

export type QueueEntry = {
  id: string;
  studentEmail: string;
  studentName: string;
  scheduledTime: string;
  status: string;
}

export type UsersQueue = {
  id: string;
  maxStudents: string;
  comment: string;
  belongsTo: User;
}


export type RoleStatusValue = {
  label:string;
  value:string;
};

export type ApiError = {
  code: string;
  message: string;
  timestamp: Date;
}
export type ClockingEvent = {
  id: string;
  timestamp: string;
  status: string;
}

export type Event = {
  id: string;
  header: string;
  content: string;
  imageUrl: string;
  eventDate: string;
  createdBy: User;
}

export type UserStats = {
  userId: string;
  username: string;
  totalOnlineTime: number;
  totalBreakTime: number;
  totalSessions: number;
  averageSessionTime: number;
};
