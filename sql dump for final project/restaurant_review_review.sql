-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restaurant_review
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `restaurantId` int DEFAULT NULL,
  `restaurant` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `review` text,
  `rating` int DEFAULT NULL,
  `dateposted` varchar(65) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`),
  KEY `restaurantId_idx` (`restaurantId`),
  KEY `userId_idx` (`userId`),
  KEY `username_idx` (`username`),
  CONSTRAINT `restaurantId` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`_id`) ON DELETE CASCADE,
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (18,3,'Din Tai Fung',NULL,'shanta','not bad :)',4,'Sat Jan 22 2022 18:03:29 GMT+0800 (Singapore Standard Time)'),(22,1,'Marché  Mövenpick',NULL,'shanta','its very yummy !!',5,'Mon Jan 17 2022 14:47:04 GMT+0800 (Singapore Standard Time)'),(23,4,'Mc Donald',NULL,'shanta','nice',3,'Sun Feb 06 2022 12:57:07 GMT+0800 (Singapore Standard Time)'),(37,5,'Monster Curry',NULL,'shanta','not bad ',5,'Mon Jan 17 2022 22:39:07 GMT+0800 (Singapore Standard Time)'),(47,3,'Din Tai Fung',NULL,'nas','dumplings',4,'Tue Jan 18 2022 15:54:17 GMT+0800 (Singapore Standard Time)'),(48,6,'Black Society',NULL,'shanta','good',5,'Fri Jan 28 2022 14:46:50 GMT+0800 (Singapore Standard Time)'),(50,10,'Mos Burger',NULL,'shanta','nice',4,'Fri Jan 28 2022 13:12:12 GMT+0800 (Singapore Standard Time)'),(51,2,'Sushi Tei',NULL,'ryan','not bad ',5,'Fri Jan 28 2022 14:41:27 GMT+0800 (Singapore Standard Time)'),(52,6,'Black Society',NULL,'ryan','not bad',3,'Fri Jan 28 2022 14:43:42 GMT+0800 (Singapore Standard Time)'),(54,2,'Sushi Tei',NULL,'shanta','its pretty bussin',4,'Thu Feb 03 2022 00:38:28 GMT+0800 (Singapore Standard Time)'),(56,3,'Din Tai Fung',NULL,'ryan','i love food <3',5,'Thu Feb 03 2022 00:09:18 GMT+0800 (Singapore Standard Time)'),(58,4,'Mc Donald',NULL,'seoul','bussin',5,'Thu Feb 03 2022 13:14:15 GMT+0800 (Singapore Standard Time)'),(59,1,'Marché  Mövenpick',NULL,'shanta','i love the rosti',3,'Thu Feb 03 2022 00:35:35 GMT+0800 (Singapore Standard Time)'),(60,3,'Din Tai Fung',NULL,'seoul','really great food',4,'Sat Feb 05 2022 18:35:25 GMT+0800 (Singapore Standard Time)'),(63,2,'Sushi Tei',NULL,'nas','sashimi was nice',5,'Sat Feb 05 2022 20:02:46 GMT+0800 (Singapore Standard Time)'),(64,4,'Mc Donald',NULL,'nas','its ok',3,'Sat Feb 05 2022 20:05:48 GMT+0800 (Singapore Standard Time)'),(73,8,'Kko Kko Na Ra',NULL,'shanta','fried chicken :)',5,'Sun Feb 06 2022 15:47:29 GMT+0800 (Singapore Standard Time)');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-06 16:42:56
