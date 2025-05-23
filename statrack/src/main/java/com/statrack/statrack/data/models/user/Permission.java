package com.statrack.statrack.data.models.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {
    ADMIN_PERMISSION("Admin permission"),

    CAN_VIEW_USERS("Can view users"),
    CAN_EDIT_USERS("Can edit users"),

    CAN_VIEW_EVENTS("Can view events"),
    CAN_EDIT_EVENTS("Can create events");




    private final String permission;
}
