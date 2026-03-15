package com.agave.api.web;

import com.agave.api.service.InventoryService;
import com.agave.api.web.dto.CategoryDTO;
import com.agave.api.web.dto.ProductDTO;
import com.agave.api.web.dto.StockMovementDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // ── Categories ────────────────────────────────────────────────────────────

    @PostMapping("/tenants/{tenantId}/categories")
    public ResponseEntity<CategoryDTO.Response> createCategory(
            @PathVariable UUID tenantId,
            @Valid @RequestBody CategoryDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inventoryService.createCategory(request, tenantId));
    }

    @GetMapping("/tenants/{tenantId}/categories")
    public ResponseEntity<List<CategoryDTO.Response>> getCategories(
            @PathVariable UUID tenantId) {
        return ResponseEntity.ok(inventoryService.getCategories(tenantId));
    }

    // ── Products ──────────────────────────────────────────────────────────────

    @PostMapping("/tenants/{tenantId}/products")
    public ResponseEntity<ProductDTO.Response> createProduct(
            @PathVariable UUID tenantId,
            @Valid @RequestBody ProductDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inventoryService.createProduct(request, tenantId));
    }

    @GetMapping("/tenants/{tenantId}/products")
    public ResponseEntity<List<ProductDTO.Response>> getProducts(
            @PathVariable UUID tenantId) {
        return ResponseEntity.ok(inventoryService.getProducts(tenantId));
    }

    @GetMapping("/tenants/{tenantId}/products/available")
    public ResponseEntity<List<ProductDTO.Response>> getAvailableProducts(
            @PathVariable UUID tenantId) {
        return ResponseEntity.ok(inventoryService.getAvailableProducts(tenantId));
    }

    // ── Stock Movements ───────────────────────────────────────────────────────

    @PostMapping("/tenants/{tenantId}/movements")
    public ResponseEntity<StockMovementDTO.Response> registerMovement(
            @PathVariable UUID tenantId,
            @Valid @RequestBody StockMovementDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inventoryService.registerMovement(request, tenantId));
    }

    @GetMapping("/tenants/{tenantId}/movements")
    public ResponseEntity<List<StockMovementDTO.Response>> getMovements(
            @PathVariable UUID tenantId) {
        return ResponseEntity.ok(inventoryService.getMovements(tenantId));
    }
}