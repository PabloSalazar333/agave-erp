package com.agave.api.web;

import com.agave.api.service.TenantService;
import com.agave.api.web.dto.TenantCreateDTO;
import com.agave.api.web.dto.TenantResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
@Tag(name = "Tenant Management", description = "Operations related to tenants/companies")
public class TenantController {

    private final TenantService tenantService;

    @PostMapping
    @Operation(summary = "Create a new tenant/company")
    public ResponseEntity<TenantResponseDTO> createTenant(@Valid @RequestBody TenantCreateDTO dto) {
        return new ResponseEntity<>(tenantService.createTenant(dto), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "List all tenants")
    public ResponseEntity<List<TenantResponseDTO>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }
}
