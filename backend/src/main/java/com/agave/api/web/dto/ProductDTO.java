package com.agave.api.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public class ProductDTO {

    @Data
    public static class Request {
        @NotBlank
        private String name;
        private String description;
        @NotNull
        @PositiveOrZero
        private BigDecimal price;
        @NotNull
        private UUID categoryId;
    }

    @Data
    @Builder
    public static class Response {
        private UUID id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private boolean active;
        private UUID categoryId;
        private String categoryName;
        private LocalDateTime createdAt;
    }
}