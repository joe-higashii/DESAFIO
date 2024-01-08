package br.com.neki.sistemaskill.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.com.neki.sistemaskill.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
