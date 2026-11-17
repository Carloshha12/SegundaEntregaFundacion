CREATE TABLE categorias (
  idCategoria INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (idCategoria)
);

CREATE TABLE generos (
  idGenero INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (idGenero)
);

CREATE TABLE actores (
  idActor INT NOT NULL AUTO_INCREMENT,
  nombreCompleto VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (idActor)
);

CREATE TABLE contenido (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(150) NOT NULL,
  resumen TEXT,
  temporadas INT,
  poster VARCHAR(255),
  trailer VARCHAR(255),
  idCategoria INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE contenido_generos (
  idContenido INT NOT NULL,
  idGenero INT NOT NULL,
  PRIMARY KEY (idContenido, idGenero)
);

CREATE TABLE contenido_actores (
  idContenido INT NOT NULL,
  idActor INT NOT NULL,
  PRIMARY KEY (idContenido, idActor)
);

ALTER TABLE contenido ADD CONSTRAINT contenido_fk0 FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria);
ALTER TABLE contenido_generos ADD CONSTRAINT contenido_generos_fk0 FOREIGN KEY (idContenido) REFERENCES contenido(id);
ALTER TABLE contenido_generos ADD CONSTRAINT contenido_generos_fk1 FOREIGN KEY (idGenero) REFERENCES generos(idGenero);
ALTER TABLE contenido_actores ADD CONSTRAINT contenido_actores_fk0 FOREIGN KEY (idContenido) REFERENCES contenido(id);
ALTER TABLE contenido_actores ADD CONSTRAINT contenido_actores_fk1 FOREIGN KEY (idActor) REFERENCES actores(idActor);
