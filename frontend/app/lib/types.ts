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

export type RoleStatusValue = {
  label:string;
  value:string;
};

export type ApiError = {
  code: string;
  message: string;
  timestamp: Date;
}
export type TimelineItem = {
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
