package com.agave.api.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TenantCreateDTO {
    @NotBlank(message = "Nam is required")
    private String name;
}
