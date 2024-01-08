package br.com.neki.sistemaskill.model;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "user_skills")
@Entity
@Data
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private SkillLevelEnum level;
}
