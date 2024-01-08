package br.com.neki.sistemaskill.service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.neki.sistemaskill.dto.UserResponseDTO;
import br.com.neki.sistemaskill.model.User;
import br.com.neki.sistemaskill.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponseDTO findUserById(Long id) {
        Optional<User> userFound = repository.findById(id);

        if (userFound.isPresent()) {
            return modelMapper.map(userFound.get(), UserResponseDTO.class);
        } else {
            throw new NoSuchElementException("Error! User not found with id: " + id);
        }

    }

    public List<UserResponseDTO> findAllUsers() {
        List<User> userList = repository.findAll();
        return userList.stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .toList();
    }

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}
