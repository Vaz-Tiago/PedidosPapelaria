CREATE DATABASE pedidosPapelaria;
USE pedidosPapelaria;


CREATE TABLE produtos
(
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(255),
  valor DECIMAL(10,2) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE pedidos
(
  id INT NOT NULL AUTO_INCREMENT,
  finalizado BOOLEAN,
  total DECIMAL(10,2) DEFAULT 0,
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE pedidoItens
(
  id INT NOT NULL AUTO_INCREMENT,
  produto_id INT NOT NULL,
  pedido_id INT NOT NULL, 
  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(produto_id) REFERENCES produtos(id),
  FOREIGN KEY(pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);


/*  POPULANDO O BANCO */
INSERT INTO produtos (nome, descricao, valor) VALUES 
  ('Livro', 'Livro Capa Dura', 15), 
  ('Caderno', 'Caderno 100 folhas', 8.50),
  ('Lápis', 'Lápis 2b', 3),
  ('Caneta', 'Caneta 4 cores', 11.75),
  ('Borracha', 'Borracha Branca', 2.30);
