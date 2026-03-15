package com.agave.api.service;

import com.agave.api.domain.*;
import com.agave.api.repository.*;
import com.agave.api.web.dto.CategoryDTO;
import com.agave.api.web.dto.ProductDTO;
import com.agave.api.web.dto.StockMovementDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;
    private final TenantRepository tenantRepository;

    // ── Categories ──────────────────────────────────────────────────────────

    @Transactional
    public CategoryDTO.Response createCategory(CategoryDTO.Request request, UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .tenant(tenant)
                .build();

        category = categoryRepository.save(category);
        return toCategoryResponse(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryDTO.Response> getCategories(UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        return categoryRepository.findByTenantAndActiveTrue(tenant)
                .stream().map(this::toCategoryResponse).toList();
    }

    // ── Products ─────────────────────────────────────────────────────────────

    @Transactional
    public ProductDTO.Response createProduct(ProductDTO.Request request, UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(category)
                .tenant(tenant)
                .build();

        product = productRepository.save(product);
        return toProductResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO.Response> getProducts(UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        return productRepository.findByTenantAndActiveTrue(tenant)
                .stream().map(this::toProductResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductDTO.Response> getAvailableProducts(UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        return productRepository.findAvailableByTenant(tenant)
                .stream().map(this::toProductResponse).toList();
    }

    // ── Stock Movements ───────────────────────────────────────────────────────

    @Transactional
    public StockMovementDTO.Response registerMovement(StockMovementDTO.Request request, UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        int stockBefore = product.getStock();
        int stockAfter;

        if (request.getType() == MovementType.IN) {
            stockAfter = stockBefore + request.getQuantity();
        } else if (request.getType() == MovementType.OUT) {
            if (stockBefore < request.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }
            stockAfter = stockBefore - request.getQuantity();
        } else {
            stockAfter = request.getQuantity();
        }

        product.setStock(stockAfter);
        productRepository.save(product);

        StockMovement movement = StockMovement.builder()
                .product(product)
                .tenant(tenant)
                .type(request.getType())
                .quantity(request.getQuantity())
                .reason(request.getReason())
                .stockBefore(stockBefore)
                .stockAfter(stockAfter)
                .build();

        movement = stockMovementRepository.save(movement);
        return toMovementResponse(movement);
    }

    @Transactional(readOnly = true)
    public List<StockMovementDTO.Response> getMovements(UUID tenantId) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));
        return stockMovementRepository.findByTenantOrderByCreatedAtDesc(tenant)
                .stream().map(this::toMovementResponse).toList();
    }

    // ── Mappers ───────────────────────────────────────────────────────────────

    private CategoryDTO.Response toCategoryResponse(Category c) {
        return CategoryDTO.Response.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .active(c.isActive())
                .createdAt(c.getCreatedAt())
                .build();
    }

    private ProductDTO.Response toProductResponse(Product p) {
        return ProductDTO.Response.builder()
                .id(p.getId())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .stock(p.getStock())
                .active(p.isActive())
                .categoryId(p.getCategory().getId())
                .categoryName(p.getCategory().getName())
                .createdAt(p.getCreatedAt())
                .build();
    }

    private StockMovementDTO.Response toMovementResponse(StockMovement m) {
        return StockMovementDTO.Response.builder()
                .id(m.getId())
                .productId(m.getProduct().getId())
                .productName(m.getProduct().getName())
                .type(m.getType())
                .quantity(m.getQuantity())
                .reason(m.getReason())
                .stockBefore(m.getStockBefore())
                .stockAfter(m.getStockAfter())
                .createdAt(m.getCreatedAt())
                .build();
    }
}