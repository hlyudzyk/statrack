import {UserRole, UserStatus} from "@/enums";
import {USER_ROLE_TO_TEXT_MAP, USER_STATUS_TO_COLOR_MAP} from "@/maps";

export function mapUserStatusToRingColor(status: UserStatus) {
    return USER_STATUS_TO_COLOR_MAP[status] ?? "ring-gray-400"
}

export function mapRoleToText(role: UserRole) {
    return USER_ROLE_TO_TEXT_MAP[role] ?? "Гість"
}

