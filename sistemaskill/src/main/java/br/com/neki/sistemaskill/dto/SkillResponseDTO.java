package br.com.neki.sistemaskill.dto;

import lombok.Data;

@Data
public class SkillResponseDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private String description;
}
