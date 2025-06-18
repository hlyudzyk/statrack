import {UserRole, UserStatus} from "@/enums";

export const USER_STATUS_TO_COLOR_MAP = {
    [UserStatus.ONLINE]: "ring-green-400",
    [UserStatus.ON_BREAK]: "ring-yellow-200",
    [UserStatus.OFFLINE]: "ring-gray-400"
} as const;

export const USER_ROLE_TO_TEXT_MAP = {
    [UserRole.ADMIN]: "Адмін",
    [UserRole.STUDENT]: "Студент",
    [UserRole.TEACHER]: "Викладач",
    [UserRole.TV_VIEWER]: "TV"
} as const;
