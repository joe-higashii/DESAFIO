package br.com.neki.sistemaskill.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import br.com.neki.sistemaskill.model.Skill;
import br.com.neki.sistemaskill.model.SkillEnum;
import br.com.neki.sistemaskill.repository.SkillRepository;

@Component
public class SkillDataInitializer {

    @Autowired
    private SkillRepository skillRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void populateSkills() {
        for (SkillEnum skillEnum : SkillEnum.values()) {
            Skill skill = new Skill();
            skill.setName(skillEnum.getName());
            skill.setDescription(skillEnum.getDescription());
            skill.setImageUrl(skillEnum.getImageUrl());

            skillRepository.findByName(skill.getName()).orElseGet(() -> skillRepository.save(skill));
        }
    }
}
