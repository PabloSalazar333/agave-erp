package com.agave.api.web.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserResponseDTO {
    private UUID id;
    private String email;
    private String firstName;
    private String lastName;
    private boolean active;
    private LocalDateTime createdAt;
    private UUID tenantId;
    private String tenantName;
    private com.agave.api.domain.Role role;
}
