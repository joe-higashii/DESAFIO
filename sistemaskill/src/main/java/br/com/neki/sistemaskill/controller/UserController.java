package br.com.neki.sistemaskill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.neki.sistemaskill.dto.UserResponseDTO;
import br.com.neki.sistemaskill.model.User;
import br.com.neki.sistemaskill.security.JwtTokenService;
import br.com.neki.sistemaskill.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/register")
    @Operation(summary = "Endpoint para salvar novo usuário")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            String token = jwtTokenService.generateToken(user.getUsername());
            return ResponseEntity.ok("Usuário cadastrado com sucesso! Token: " + token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    @Operation(summary = "Listar todos os usuários")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Endpoint para retornar usuário com base no id")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }
}
