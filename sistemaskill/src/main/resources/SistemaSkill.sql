-- Criação da tabela 'users'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criação da tabela 'skills'
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Criação da tabela associativa 'user_skills'
CREATE TABLE user_skills (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    level VARCHAR(255),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id),
    CONSTRAINT fk_skill
        FOREIGN KEY(skill_id) 
        REFERENCES skills(id)
);

-- Criação de índices
CREATE INDEX idx_user ON user_skills(user_id);
CREATE INDEX idx_skill ON user_skills(skill_id);
