-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: trailerflix
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `trailerflix`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `trailerflix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `trailerflix`;

--
-- Table structure for table `actores`
--

DROP TABLE IF EXISTS `actores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actores` (
  `idActor` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(100) NOT NULL,
  PRIMARY KEY (`idActor`),
  UNIQUE KEY `nombreCompleto` (`nombreCompleto`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actores`
--

LOCK TABLES `actores` WRITE;
/*!40000 ALTER TABLE `actores` DISABLE KEYS */;
INSERT INTO `actores` VALUES (21,'Aaron Paul'),(6,'Al Pacino'),(9,'Álvaro Morte'),(22,'Anna Gunn'),(35,'Anthony Gonzalez'),(13,'Antonia San Juan'),(27,'Anya Chalotra'),(37,'Benjamin Bratt'),(20,'Bryan Cranston'),(31,'Cho Yeo-jeong'),(14,'Claire Foy'),(4,'David Harbour'),(19,'Diego Cortina Autrey'),(2,'Finn Wolfhard'),(28,'Freya Allan'),(36,'Gael García Bernal'),(26,'Henry Cavill'),(16,'Imelda Staunton'),(10,'Itziar Ituño'),(11,'Iván Massagué'),(23,'Ivana Baquero'),(7,'Joe Pesci'),(30,'Lee Sun-kyun'),(33,'Lisa Vicari'),(32,'Louis Hofmann'),(25,'Maribel Verdú'),(18,'Marina de Tavira'),(1,'Millie Bobby Brown'),(34,'Oliver Masucci'),(15,'Olivia Colman'),(5,'Robert De Niro'),(24,'Sergi López'),(29,'Song Kang-ho'),(8,'Úrsula Corberó'),(3,'Winona Ryder'),(17,'Yalitza Aparicio'),(12,'Zorion Eguileor');
/*!40000 ALTER TABLE `actores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (2,'película'),(1,'serie');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido`
--

DROP TABLE IF EXISTS `contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido`
--

LOCK TABLES `contenido` WRITE;
/*!40000 ALTER TABLE `contenido` DISABLE KEYS */;
INSERT INTO `contenido` VALUES (1,'Stranger Things','Un grupo de chicos enfrenta fuerzas sobrenaturales en su pueblo de Indiana.',4,'stranger_things.jpg','https://www.youtube.com/watch?v=b9EkMc79ZSU',1),(2,'El Irlandés','Un veterano recuerda su vida como sicario ligado a la mafia.',NULL,'el_irlandes.jpg',NULL,2),(3,'La Casa de Papel','Un grupo de ladrones planea el atraco perfecto a la Casa de Moneda.',5,'la_casa_de_papel.jpg','https://www.youtube.com/watch?v=_InqQJRqGW4',1),(4,'El Hoyo','En una prisión vertical, la comida baja piso por piso y desata el instinto de supervivencia.',NULL,'el_hoyo.jpg','https://www.youtube.com/watch?v=RlfooqeZcdY',2),(5,'The Crown','El reinado de la reina Isabel II a lo largo de las décadas.',6,'the_crown.jpg',NULL,1),(6,'Roma','La vida de una empleada doméstica en la Ciudad de México de los años 70.',NULL,'roma.jpg','https://www.youtube.com/watch?v=6BS27ngZtxg',2),(7,'Breaking Bad','Un profesor de química con cáncer se convierte en fabricante de metanfetamina.',5,'breaking_bad.jpg','https://www.youtube.com/watch?v=HhesaQXLuRY',1),(8,'El Laberinto del Fauno','Una niña escapa de la España franquista hacia un mundo de fantasía y peligros.',NULL,'laberinto_del_fauno.jpg','https://www.youtube.com/watch?v=Exu6NVtsMd0',2),(9,'The Witcher','Un cazador de monstruos recorre un continente marcado por la guerra y la magia.',3,'the_witcher.jpg',NULL,1),(10,'Parásitos','Una familia pobre se infiltra en la vida de una familia adinerada.',NULL,'parasitos.jpg','https://www.youtube.com/watch?v=5xH0HfJHsaY',2),(11,'Dark','La desaparición de unos niños destapa un secreto de viajes en el tiempo en un pueblo alemán.',3,'dark.jpg','https://www.youtube.com/watch?v=ymC4Lc-yg9Q',1),(12,'Coco','Un niño viaja a la Tierra de los Muertos para descubrir el secreto de su familia.',NULL,'coco.jpg',NULL,2);
/*!40000 ALTER TABLE `contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_actores`
--

DROP TABLE IF EXISTS `contenido_actores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contenido_actores` (
  `idContenido` int(11) NOT NULL,
  `idActor` int(11) NOT NULL,
  PRIMARY KEY (`idContenido`,`idActor`),
  UNIQUE KEY `contenido_actores_idActor_idContenido_unique` (`idContenido`,`idActor`),
  KEY `idActor` (`idActor`),
  CONSTRAINT `contenido_actores_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contenido_actores_ibfk_2` FOREIGN KEY (`idActor`) REFERENCES `actores` (`idActor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_actores`
--

LOCK TABLES `contenido_actores` WRITE;
/*!40000 ALTER TABLE `contenido_actores` DISABLE KEYS */;
INSERT INTO `contenido_actores` VALUES (1,1),(1,2),(1,3),(1,4),(2,5),(2,6),(2,7),(3,8),(3,9),(3,10),(4,11),(4,12),(4,13),(5,14),(5,15),(5,16),(6,17),(6,18),(6,19),(7,20),(7,21),(7,22),(8,23),(8,24),(8,25),(9,26),(9,27),(9,28),(10,29),(10,30),(10,31),(11,32),(11,33),(11,34),(12,35),(12,36),(12,37);
/*!40000 ALTER TABLE `contenido_actores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenido_generos`
--

DROP TABLE IF EXISTS `contenido_generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contenido_generos` (
  `idContenido` int(11) NOT NULL,
  `idGenero` int(11) NOT NULL,
  PRIMARY KEY (`idContenido`,`idGenero`),
  UNIQUE KEY `contenido_generos_idGenero_idContenido_unique` (`idContenido`,`idGenero`),
  KEY `idGenero` (`idGenero`),
  CONSTRAINT `contenido_generos_ibfk_1` FOREIGN KEY (`idContenido`) REFERENCES `contenido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contenido_generos_ibfk_2` FOREIGN KEY (`idGenero`) REFERENCES `generos` (`idGenero`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido_generos`
--

LOCK TABLES `contenido_generos` WRITE;
/*!40000 ALTER TABLE `contenido_generos` DISABLE KEYS */;
INSERT INTO `contenido_generos` VALUES (1,1),(1,2),(1,3),(2,3),(2,4),(3,4),(3,5),(3,6),(4,1),(4,2),(4,6),(5,3),(5,7),(6,3),(7,3),(7,4),(7,6),(8,3),(8,8),(9,5),(9,8),(9,9),(10,3),(10,6),(10,10),(11,1),(11,6),(11,11),(12,9),(12,12),(12,13);
/*!40000 ALTER TABLE `contenido_generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generos` (
  `idGenero` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (5,'Acción'),(12,'Animación'),(9,'Aventura'),(1,'Ciencia Ficción'),(10,'Comedia'),(4,'Crimen'),(3,'Drama'),(13,'Familia'),(8,'Fantasía'),(7,'Historia'),(11,'Misterio'),(6,'Suspenso'),(2,'Terror');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
