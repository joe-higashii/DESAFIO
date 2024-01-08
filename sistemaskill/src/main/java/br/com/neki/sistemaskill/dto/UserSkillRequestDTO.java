package br.com.neki.sistemaskill.dto;

import br.com.neki.sistemaskill.model.SkillLevelEnum;
import lombok.Data;

@Data
public class UserSkillRequestDTO {
    private Long userId;
    private Long skillId;
    private SkillLevelEnum level;
}
