package com.agave.api;

import com.agave.api.domain.Role;
import com.agave.api.repository.TenantRepository;
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
public class RoleIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TenantRepository tenantRepository;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
        tenantRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "admin", roles = { "ADMIN" })
    void shouldCreateUserWithSpecificRole() throws Exception {
        // 1. Create Tenant
        TenantCreateDTO tenantDto = new TenantCreateDTO();
        tenantDto.setName("Role Corp");

        MvcResult tenantResult = mockMvc.perform(post("/api/tenants")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(tenantDto)))
                .andExpect(status().isCreated())
                .andReturn();

        String tenantIdStr = com.jayway.jsonpath.JsonPath.read(tenantResult.getResponse().getContentAsString(), "$.id");
        UUID tenantId = UUID.fromString(tenantIdStr);

        // 2. Create User with SALES Role
        UserCreateDTO userDto = new UserCreateDTO();
        userDto.setEmail("sales@agave.com");
        userDto.setPassword("securePass");
        userDto.setFirstName("Sales");
        userDto.setLastName("Man");
        userDto.setTenantId(tenantId);
        userDto.setRole(Role.ROLE_SALES);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.role").value("ROLE_SALES"));
    }
}
