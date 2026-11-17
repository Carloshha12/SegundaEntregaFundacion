CREATE TABLE `actores` (
  `idActor` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(100) NOT NULL,
  PRIMARY KEY (`idActor`),
  UNIQUE KEY `nombreCompleto` (`nombreCompleto`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `contenido` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `resumen` text DEFAULT NULL,
  `temporadas` int(11) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `contenido_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `contenido_actores` (
  `idContenido` int(11) NOT NULL,
  `idActor` int(11) NOT NULL,
  PRIMARY KEY (`idContenido`,`idActor`),
  UNIQUE KEY `contenido_actores_idActor_idContenido_unique` (`idContenido`,`idActor`),
  KEY `idActor` (`idActor`),
  CONSTRAINT `contenido_actores_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contenido_actores_ibfk_2` FOREIGN KEY (`idActor`) REFERENCES `actores` (`idActor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `contenido_generos` (
  `idContenido` int(11) NOT NULL,
  `idGenero` int(11) NOT NULL,
  PRIMARY KEY (`idContenido`,`idGenero`),
  UNIQUE KEY `contenido_generos_idGenero_idContenido_unique` (`idContenido`,`idGenero`),
  KEY `idGenero` (`idGenero`),
  CONSTRAINT `contenido_generos_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contenido_generos_ibfk_2` FOREIGN KEY (`idGenero`) REFERENCES `generos` (`idGenero`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
CREATE TABLE `generos` (
  `idGenero` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
