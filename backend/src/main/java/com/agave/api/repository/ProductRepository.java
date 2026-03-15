package com.agave.api.repository;

import com.agave.api.domain.Product;
import com.agave.api.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByTenantAndActiveTrue(Tenant tenant);

    @Query("SELECT p FROM Product p WHERE p.tenant = :tenant AND p.stock > 0 AND p.active = true")
    List<Product> findAvailableByTenant(@Param("tenant") Tenant tenant);
}