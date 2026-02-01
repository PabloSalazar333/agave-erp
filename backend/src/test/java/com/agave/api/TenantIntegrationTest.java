package com.agave.api;

import com.agave.api.domain.User;
import com.agave.api.repository.UserRepository;
import com.agave.api.web.dto.TenantCreateDTO;
import com.agave.api.web.dto.UserCreateDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TenantIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "admin")
    void shouldCreateTenantAndAssignUser() throws Exception {
        // 1. Create Tenant
        TenantCreateDTO tenantDto = new TenantCreateDTO();
        tenantDto.setName("Agave Corp");

        MvcResult tenantResult = mockMvc.perform(post("/api/tenants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(tenantDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.name").value("Agave Corp"))
                .andReturn();

        // Extract Tenant ID
        String tenantIdStr = com.jayway.jsonpath.JsonPath.read(tenantResult.getResponse().getContentAsString(), "$.id");
        UUID tenantId = UUID.fromString(tenantIdStr);

        // 2. Create User with Tenant ID
        UserCreateDTO userDto = new UserCreateDTO();
        userDto.setEmail("employee@agave.com");
        userDto.setPassword("securePass");
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setTenantId(tenantId);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("employee@agave.com"))
                .andExpect(jsonPath("$.tenantId").value(tenantId.toString()))
                .andExpect(jsonPath("$.tenantName").value("Agave Corp"));
    }
}
