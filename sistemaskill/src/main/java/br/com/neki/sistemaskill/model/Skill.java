package br.com.neki.sistemaskill.model;

import java.util.Set;
import jakarta.persistence.*;
import lombok.Data;

@Table(name = "skills")
@Entity
@Data
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = true, length = 500)
    private String description;

    @OneToMany(mappedBy = "skill")
    private Set<UserSkill> users;
}
