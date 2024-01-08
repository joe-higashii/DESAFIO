package br.com.neki.sistemaskill.dto;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private Long id;
    private String username;
    private String token;
}
