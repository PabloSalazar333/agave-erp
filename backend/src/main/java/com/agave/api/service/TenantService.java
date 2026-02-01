package com.agave.api.service;

import com.agave.api.domain.Tenant;
import com.agave.api.repository.TenantRepository;
import com.agave.api.web.dto.TenantCreateDTO;
import com.agave.api.web.dto.TenantResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TenantService {

    private final TenantRepository tenantRepository;

    @Transactional
    public TenantResponseDTO createTenant(TenantCreateDTO dto) {
        if (tenantRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Tenant with this name already exists");
        }

        Tenant tenant = Tenant.builder()
                .name(dto.getName())
                .active(true)
                .build();

        return mapToDTO(tenantRepository.save(tenant));
    }

    @Transactional(readOnly = true)
    public List<TenantResponseDTO> getAllTenants() {
        return tenantRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Tenant getTenantById(UUID id) {
        return tenantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tenant not found"));
    }

    private TenantResponseDTO mapToDTO(Tenant tenant) {
        return TenantResponseDTO.builder()
                .id(tenant.getId())
                .name(tenant.getName())
                .active(tenant.isActive())
                .createdAt(tenant.getCreatedAt())
                .build();
    }
}
