package br.com.neki.sistemaskill.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.neki.sistemaskill.model.UserSkill;
import java.util.List;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findUserSkillsByUserId(Long userId);
}
