package com.agave.api.web.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String accessToken;
    @Builder.Default
    private String tokenType = "Bearer";
}
