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
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `about` text,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location_latitude` float(10,6) DEFAULT NULL,
  `location_longitude` float(10,6) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_postalcode` int DEFAULT NULL,
  `monday` varchar(255) DEFAULT NULL,
  `tuesday` varchar(255) DEFAULT NULL,
  `wednesday` varchar(255) DEFAULT NULL,
  `thursday` varchar(255) DEFAULT NULL,
  `friday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'Marché  Mövenpick','European','Marché Mövenpick Singapore is a Swiss marketplace restaurant that offers a wide selection of fresh and healthy products! Here, you can tuck into delicious, authentic European delights cooked live','images/restaurants/Marche-Movenpick.png',1.264293,103.822304,'1 HarbourFront Walk #03-14, VivoCity',98585,'11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-10:30pm'),(2,'Sushi Tei','Japanese','Sushi Tei is no ordinary dining restaurant. We believe in providing an alluring ambience that sets us apart from a regular diner. Illustrating the emerging influence Asia has on modern Japanese cuisine, our menu features a fusion of traditional Japanese dishes with modern innovative trends.','images/restaurants/Sushi-Tei.jpg',1.360200,103.989799,'78 Airport Boulevard, #03-209, Jewel Changi Airport',819666,'11:30am-10:00pm','11:30am-10:00pm','11:30am-10:00pm','11:30am-10:00pm','11:30am-10:00pm'),(3,'Din Tai Fung','Chinese','Taiwan is known for the best dumplings in the world. It\'s Din Tai Fung that perfected the art, the science of the perfect soup dumpling (aka xiaolongbao or XLB for short). That\'s why this family-owned dynasty now attracts long lines at their locations around the world.','images/restaurants/Din-Tai-Fung.png',1.352300,103.945099,'4 Tampines Central 5, 02-01 Tampines Mall,',529510,'11:30am-09:00pm','11:30am-09:00pm','11:30am-09:00pm','11:30am-09:00pm','11:30am-09:30pm'),(4,'Mc Donald','Western','McDonald American fast-food chain that is one of the worlds largest, known for its hamburgers, especially Big Macs.','images/restaurants/mac.jpg',1.378300,103.941902,'93 Pasir Ris Drive 3, #01-02, Pasir Ris Elias Community Club',519498,'06:00am-02:00am','06:00am-02:00am','06:00am-02:00am','06:00am-00:00am','Opens 24 Hours'),(5,'Monster Curry','Japanese','Monster Curry is the only restaurant in Singapore that serves Japanese demi-glace curry made with 14 different vegetables and spices','images/restaurants/Monster-Curry.png',1.406800,103.902496,'83 Punggol Central, 02-25 Waterway Point',828761,'11:00am-05:00pm','12:00pm-08:00pm','11:00am-10:00pm','11:00am-10:00pm','11:00am-10:00pm'),(6,'Black Society','Chinese','Our “Black Society” restaurant, which began operations in 2006 has offered a wide range of innovative and contemporary Chinese cuisines set in a  stylish and black-colored theme interior design. In addition to popular Cantonese dim sum and traditional Chinese banquet dishes, our menu continues to evolve as we incorporate other regional flavours and trendy elements into traditional Chinese cuisine.','images/restaurants/black-society.png',1.264293,103.822304,'1 HarbourFront Walk, #02-156/157 Vivo City',98585,'11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm'),(7,'KFC','Western','KFC is an American fast food restaurant chain headquartered in Louisville, Kentucky that specializes in fried chicken','images/restaurants/kfc-logo.png',1.353000,103.939400,'1 Tampines Walk, #01-13/14 Our Tampines Hub',528523,'08:00am-10:30pm','08:00am-10:30pm','08:00am-10:30pm','08:00am-10:30pm','08:00am-10:30pm'),(8,'Kko Kko Na Ra','Korean','Kko Kko Na Ra is the originator of Korean fried chicken restaurant in Singapore to introduce first Chi-Mek (Korean Fried Chicken & Beer) & supper culture in Singapore since 2008.','images/restaurants/kko-kko-nara.png',1.278000,103.840401,'68 Tg Pagar Rd',88489,'11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm','11:00am-09:30pm'),(9,'Genki Sushi','Japanese','A subsidiary of Maxim’s Group Hong Kong, Genki Sushi Singapore operates a total of 17 outlets island-wide, with more to come. Focusing on Kaiten (revolving) sushi, a concept pioneered by the brand’s founder Fumio Saito, Genki Sushi prides itself on offering quality and contemporary Japanese cuisine at an excellent value.','images/restaurants/genki.png',1.300600,103.839897,'181 Orchard Road #04-30',238896,'11:00am-10:00pm','11:00am-10:00pm','11:00am-10:00pm','11:00am-10:00pm','11:00am-10:00pm'),(10,'Mos Burger','Western','Popularizing the rice burgers of our generation, MOS Burger offers fast food that is prepared on order. Combining the western favourite with tastes of Japan, MOS Burger reinvents the burger with a twist. Our Yakiniku Rice Burger and Teriyaki Burger are must-tries if you love a bit of the west in your Japanese food.','images/restaurants/mos.jpg',1.372400,103.949699,'1 Pasir Ris Central St 3',518457,'10:30am-9:30pm','10:30am-9:30pm','10:30am-9:30pm','10:30am-9:30pm','10:30am-9:30pm');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
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
