package com.agave.api.web.dto;

import com.agave.api.domain.MovementType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

public class StockMovementDTO {

    @Data
    public static class Request {
        @NotNull
        private UUID productId;
        @NotNull
        private MovementType type;
        @NotNull
        @Positive
        private Integer quantity;
        private String reason;
    }

    @Data
    @Builder
    public static class Response {
        private UUID id;
        private UUID productId;
        private String productName;
        private MovementType type;
        private Integer quantity;
        private String reason;
        private Integer stockBefore;
        private Integer stockAfter;
        private LocalDateTime createdAt;
    }
}