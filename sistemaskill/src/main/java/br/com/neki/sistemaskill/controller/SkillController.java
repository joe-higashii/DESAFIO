package br.com.neki.sistemaskill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.neki.sistemaskill.dto.SkillResponseDTO;
import br.com.neki.sistemaskill.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@Tag(name = "Skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    @Operation(summary = "Listar todas as habilidades")
    public ResponseEntity<List<SkillResponseDTO>> getAllSkills() {
        List<SkillResponseDTO> skills = skillService.getAllSkills();
        return ResponseEntity.ok(skills);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter uma habilidade pelo ID")
    public ResponseEntity<SkillResponseDTO> getSkillById(@PathVariable Long id) {
        SkillResponseDTO skill = skillService.getSkillById(id);
        return ResponseEntity.ok(skill);
    }
}
