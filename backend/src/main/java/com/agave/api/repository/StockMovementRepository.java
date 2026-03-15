package com.agave.api.repository;

import com.agave.api.domain.StockMovement;
import com.agave.api.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StockMovementRepository extends JpaRepository<StockMovement, UUID> {
    List<StockMovement> findByTenantOrderByCreatedAtDesc(Tenant tenant);
    List<StockMovement> findByProductIdOrderByCreatedAtDesc(UUID productId);
}