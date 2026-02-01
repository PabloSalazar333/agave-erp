package com.agave.api.service;

import com.agave.api.domain.User;
import com.agave.api.repository.UserRepository;
import com.agave.api.web.dto.UserCreateDTO;
import com.agave.api.web.dto.UserResponseDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserResponseDTO createUser(UserCreateDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword()) // Note: Should be hashed in real app
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .active(true)
                .build();

        User savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return mapToDTO(user);
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private UserResponseDTO mapToDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .active(user.isActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
