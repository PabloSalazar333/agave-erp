package com.agave.api.web.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TenantResponseDTO {
    private UUID id;
    private String name;
    private boolean active;
    private LocalDateTime createdAt;
}
