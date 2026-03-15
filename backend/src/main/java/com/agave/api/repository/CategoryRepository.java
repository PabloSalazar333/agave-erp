package com.agave.api.repository;

import com.agave.api.domain.Category;
import com.agave.api.domain.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByTenantAndActiveTrue(Tenant tenant);
}