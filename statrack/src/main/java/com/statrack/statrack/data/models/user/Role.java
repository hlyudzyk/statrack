package com.statrack.statrack.data.models.user;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@RequiredArgsConstructor
public enum Role {
  TV_VIEWER(
      Set.of(
          Permission.CAN_VIEW_USERS,
          Permission.CAN_VIEW_EVENTS
      )
  ),
  TEACHER(
      Set.of(
          Permission.CAN_VIEW_USERS,
          Permission.CAN_VIEW_EVENTS
      )
  ),
  ADMIN(
        Set.of(
          Permission.ADMIN_PERMISSION,
          Permission.CAN_EDIT_USERS,
          Permission.CAN_VIEW_USERS,
          Permission.CAN_VIEW_EVENTS,
          Permission.CAN_EDIT_EVENTS
        )
  );

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
