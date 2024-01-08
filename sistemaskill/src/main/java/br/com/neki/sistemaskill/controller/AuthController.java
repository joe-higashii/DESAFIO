package br.com.neki.sistemaskill.controller;

import br.com.neki.sistemaskill.dto.AuthDTO;
import br.com.neki.sistemaskill.dto.LoginResponseDTO;
import br.com.neki.sistemaskill.model.User;
import br.com.neki.sistemaskill.security.JwtTokenService;
import br.com.neki.sistemaskill.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenService jwtTokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody AuthDTO authDTO) {
        try {
            User user = authService.authenticate(authDTO.getUsername(), authDTO.getPassword());
            String token = jwtTokenService.generateToken(user.getUsername());
    
            LoginResponseDTO response = new LoginResponseDTO();
            response.setId(user.getId());
            response.setUsername(user.getUsername());
            response.setToken(token);
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
