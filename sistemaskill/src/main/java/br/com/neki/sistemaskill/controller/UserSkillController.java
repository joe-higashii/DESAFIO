package br.com.neki.sistemaskill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.com.neki.sistemaskill.dto.UserSkillRequestDTO;
import br.com.neki.sistemaskill.dto.UserSkillResponseDTO;
import br.com.neki.sistemaskill.model.SkillLevelEnum;
import br.com.neki.sistemaskill.service.UserSkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

@RestController
@RequestMapping("/api/user-skills")
@Tag(name = "User-Skills")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @PostMapping
    @Operation(summary = "Associar habilidade a um usuário")
    public ResponseEntity<UserSkillResponseDTO> associateSkill(@RequestBody UserSkillRequestDTO userSkillRequestDTO) {
        UserSkillResponseDTO userSkillResponseDTO = userSkillService.associateSkill(userSkillRequestDTO);
        return ResponseEntity.ok(userSkillResponseDTO);
    }

    @PutMapping("/{userSkillId}")
    @Operation(summary = "Atualizar o nível da habilidade associada")
    public ResponseEntity<UserSkillResponseDTO> updateSkill(@PathVariable Long userSkillId, 
                                                            @RequestParam String newLevel) {
        SkillLevelEnum levelEnum;
        try {
            levelEnum = SkillLevelEnum.valueOf(newLevel.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Nível inválido: " + newLevel
            );
        }
        UserSkillResponseDTO userSkillResponseDTO = userSkillService.updateSkill(userSkillId, levelEnum);
        return ResponseEntity.ok(userSkillResponseDTO);
    }

    @DeleteMapping("/{userSkillId}")
    @Operation(summary = "Excluir associação de habilidade")
    public ResponseEntity<?> deleteSkill(@PathVariable Long userSkillId) {
        userSkillService.deleteSkill(userSkillId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Listar habilidades de um usuário")
    public ResponseEntity<List<UserSkillResponseDTO>> getUserSkills(@PathVariable Long userId) {
        List<UserSkillResponseDTO> userSkills = userSkillService.getUserSkills(userId);
        return ResponseEntity.ok(userSkills);
    }
}
