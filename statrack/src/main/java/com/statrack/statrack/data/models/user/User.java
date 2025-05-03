package com.statrack.statrack.data.models.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.statrack.statrack.security.token.Token;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  private String firstname;
  private String lastname;

  @Column(unique=true)
  private String email;

  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  private LocalDate birthday;

  @Column(name = "image_url")
  private String imageUrl;
  private LocalDateTime lastSession;

  @Enumerated(EnumType.STRING)
  private Status status;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private UserAccountStatus accountStatus;

  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return this.accountStatus != UserAccountStatus.DISABLED;
  }

  public enum Status {
    ONLINE, OFFLINE, ON_BREAK
  }

  public enum UserAccountStatus {
    PENDING_ACTIVATION, ACTIVE, DISABLED
  }

}
