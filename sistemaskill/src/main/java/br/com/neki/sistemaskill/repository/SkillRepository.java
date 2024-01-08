package br.com.neki.sistemaskill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.neki.sistemaskill.model.Skill;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByNameContainingIgnoreCase(String searchKey);
    Optional<Skill> findByName(String name);
}
