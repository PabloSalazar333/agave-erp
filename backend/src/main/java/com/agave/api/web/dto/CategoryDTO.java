package com.agave.api.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

public class CategoryDTO {

    @Data
    public static class Request {
        @NotBlank
        private String name;
        private String description;
    }

    @Data
    @Builder
    public static class Response {
        private UUID id;
        private String name;
        private String description;
        private boolean active;
        private LocalDateTime createdAt;
    }
}