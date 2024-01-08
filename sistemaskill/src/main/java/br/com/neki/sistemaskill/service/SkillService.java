package br.com.neki.sistemaskill.service;

import br.com.neki.sistemaskill.dto.SkillResponseDTO;
import br.com.neki.sistemaskill.model.Skill;
import br.com.neki.sistemaskill.repository.SkillRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<SkillResponseDTO> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(skill -> modelMapper.map(skill, SkillResponseDTO.class))
                .collect(Collectors.toList());
    }

    public SkillResponseDTO getSkillById(Long skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
        return modelMapper.map(skill, SkillResponseDTO.class);
    }
}
