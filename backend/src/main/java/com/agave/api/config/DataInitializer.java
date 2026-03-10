package com.agave.api.config;

import com.agave.api.domain.Role;
import com.agave.api.repository.UserRepository;
import com.agave.api.service.UserService;
import com.agave.api.web.dto.UserCreateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        try {
            createDefaultAdmin();
        } catch (Exception e) {
            System.err.println("ERROR en DataInitializer: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void createDefaultAdmin() {
        String adminEmail = "admin@agaveerp.com";
        if (!userRepository.existsByEmail(adminEmail)) {
            UserCreateDTO admin = new UserCreateDTO();
            admin.setEmail(adminEmail);
            admin.setPassword("admin123");
            admin.setFirstName("Super");
            admin.setLastName("Admin");
            admin.setRole(Role.ROLE_SUPER_ADMIN);
            // No tenant for super admin initially

            userService.createUser(admin);
            System.out.println("LOG: Default Admin User created: " + adminEmail);
        } else {
            System.out.println("LOG: Admin User already exists.");
        }
    }
}
