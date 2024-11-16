CREATE DATABASE IF NOT EXISTS sistemaGerenciamento;

USE sistemaGerenciamento;

CREATE TABLE IF NOT EXISTS Animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    pelagem VARCHAR(50),
    castrado BOOLEAN,
    lesao BOOLEAN,
    localizacao_lesao VARCHAR(255),
    teve_filhotes BOOLEAN,
    quantidade_filhotes INT
);

CREATE TABLE IF NOT EXISTS Alimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_animal INT NOT NULL,
    tipo_alimento VARCHAR(100) NOT NULL,
    quantidade DECIMAL(10, 2) NOT NULL,  -- Quantidade em gramas
    data_chegada DATE NOT NULL,
    FOREIGN KEY (id_animal) REFERENCES Animais(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Transacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo ENUM('receita', 'despesa') NOT NULL,  -- Tipo da transação (receita ou despesa)
    data DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Orcamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    limite_receitas DECIMAL(10, 2) NOT NULL,
    limite_despesas DECIMAL(10, 2) NOT NULL
);

INSERT INTO Animais (nome, especie, idade, peso, pelagem, castrado, lesao, localizacao_lesao, teve_filhotes, quantidade_filhotes)
VALUES
    ('Rex', 'Cão', 3, 15.50, 'Curta', TRUE, FALSE, NULL, FALSE, 0),
    ('Mia', 'Gato', 2, 4.20, 'Longa', TRUE, TRUE, 'Pata esquerda', FALSE, 0);

INSERT INTO Alimentacoes (id_animal, tipo_alimento, quantidade, data_chegada)
VALUES
    (1, 'Ração seca', 500, '2024-11-10'),
    (2, 'Ração úmida', 200, '2024-11-12');

INSERT INTO Transacoes (descricao, valor, tipo, data)
VALUES
    ('Venda de ração', 300.00, 'receita', '2024-11-01'),
    ('Compra de ração', 150.00, 'despesa', '2024-11-05');

INSERT INTO Orcamento (limite_receitas, limite_despesas)
VALUES
    (1000.00, 500.00);
