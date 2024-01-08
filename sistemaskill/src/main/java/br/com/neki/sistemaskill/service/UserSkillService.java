package br.com.neki.sistemaskill.service;

import br.com.neki.sistemaskill.dto.UserSkillRequestDTO;
import br.com.neki.sistemaskill.dto.UserSkillResponseDTO;
import br.com.neki.sistemaskill.model.Skill;
import br.com.neki.sistemaskill.model.SkillLevelEnum;
import br.com.neki.sistemaskill.model.User;
import br.com.neki.sistemaskill.model.UserSkill;
import br.com.neki.sistemaskill.repository.SkillRepository;
import br.com.neki.sistemaskill.repository.UserRepository;
import br.com.neki.sistemaskill.repository.UserSkillRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ModelMapper modelMapper;

    public UserSkillResponseDTO associateSkill(UserSkillRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(request.getSkillId())
                        .orElseThrow(() -> new RuntimeException("Skill not found"));

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setLevel(request.getLevel());

        userSkill = userSkillRepository.save(userSkill);
        return modelMapper.map(userSkill, UserSkillResponseDTO.class);
    }

    public UserSkillResponseDTO updateSkill(Long userSkillId, SkillLevelEnum newLevel) {
        UserSkill userSkill = userSkillRepository.findById(userSkillId)
                        .orElseThrow(() -> new RuntimeException("UserSkill not found"));
        userSkill.setLevel(newLevel);

        userSkill = userSkillRepository.save(userSkill);
        return modelMapper.map(userSkill, UserSkillResponseDTO.class);
    }

    public void deleteSkill(Long userSkillId) {
        userSkillRepository.deleteById(userSkillId);
    }

    public List<UserSkillResponseDTO> getUserSkills(Long userId) {
        List<UserSkill> userSkills = userSkillRepository.findUserSkillsByUserId(userId);
        return userSkills.stream().map(userSkill -> {
            UserSkillResponseDTO dto = modelMapper.map(userSkill, UserSkillResponseDTO.class);
            dto.setName(userSkill.getSkill().getName());
            dto.setImageUrl(userSkill.getSkill().getImageUrl());
            dto.setDescription(userSkill.getSkill().getDescription());
            return dto;
        }).collect(Collectors.toList());
    }
}
