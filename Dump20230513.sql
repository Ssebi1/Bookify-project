-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: bookify
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_title` varchar(1000) DEFAULT NULL,
  `book_author` varchar(1000) DEFAULT NULL,
  `book_category` varchar(1000) DEFAULT NULL,
  `book_link` varchar(1000) NOT NULL,
  `book_notes` varchar(10000) DEFAULT NULL,
  `book_progress` int DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (6,2,'Coffee','Claudia Roden','Cooking','https://books.google.com/books/about/Coffee.html?hl=&id=qYxYAAAAYAAJ','<p>Roden explores the history of the bean from the ancient traditions of coffee-making in the Levant, to modern day additives and substitutes. There is also an A-Z (by producing country) guide of quality beans and recipes. test</p>',NULL),(7,2,'Computer Usage; 360 Assembly Programming','Computer Usage Company,Eric Alan Weiss','Assembler language (Computer program language).','https://books.google.com/books/about/Computer_Usage_360_Assembly_Programming.html?hl=&id=q8wmAAAAMAAJ','Teaches the fundamentals of IBM system/360 assembly language programming.',NULL),(8,2,'Cooking Out-of-doors','Girl Scouts of the United States of America','Cooking','https://books.google.com/books/about/Cooking_Out_of_doors.html?hl=&id=kHAvAAAAYAAJ','\'A guide for all who would take to the trail and stop along the way for a hiker\'s snack or a woodland feast. Basic information on ways of building fires, kinds of fuel, methods of food care, progressive menus, and cook-outs have been included for new troops that are just beginning to explore the adventure of cooking out. Experienced troops will improve their skill by using the advanced techniques and recipes found in these pages.\'--Pref.',NULL),(9,5,'Non-foreign COLA','United States,United States. Congress. Senate. Committee on Homeland Security and Governmental Affairs. Subcommittee on Oversight of Government Management, the Federal Workforce, and the District of Columbia','Electronic books','https://play.google.com/store/books/details?id=Amfi0J5J-GsC','',NULL),(10,2,'The Secret Guide to Computers, 2001','Russ Walter','Microcomputers','https://books.google.com/books/about/The_Secret_Guide_to_Computers_2001.html?hl=&id=ER6B0I9ralMC','',NULL),(11,3,'Marele Singuratic','Troe Robert Alecsandru','General','https://books.google.com/books/about/Marele_Singuratic.html?hl=&id=0iazBwAAQBAJ','<p>sfafafaf</p>',100);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `user_email` varchar(20) NOT NULL,
  `user_password` varchar(60) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Sebi-teacher','teacher@yahoo.com','$2a$08$iYjn1SeOeqpzwwr.jtrDkuNK1IenQ7emqf24GCXDDM5enIm/3dCfC','teacher'),(3,'Sebi-admin','admin@yahoo.com','$2a$08$abSd.NLvQojqsY4yBoXYce/gPi.Wb.sFCMsCpIxPRSHmhNOIH3jZm','admin'),(5,'test','test@yahoo.com','$2a$08$KUxZUX5FCN67DLgXqp8oDeV/jD3xRE66tuzzH4O7JyfdgBixoMk9e','user'),(6,'test','test2@yahoo.com','$2a$08$GgMsejRhCvA1z7m359.zruJj0ePAy4zpchfWsRVB3bQe/2SpfWccK','teacher'),(7,'test','test3@yahoo.com','$2a$08$FxyxkbebwduyEBxiUNDpsuXDoOvAW42A/AzgUfEBpb1yJ50Q6l4kS','user'),(8,'test','test4@yahoo.com','$2a$08$oYKxUChveN4Ue.IDYYSoVe0sxHQZEPvX2j2ziUyPlhy8VHqLoB7p6','user'),(9,'Sebi','sebidancau@yahoo.com','$2a$08$Ke8J9f1xXo/kFYVeCo..Ju6ivK.BUW0cy9ri01DlmwNtAVJFBeBv2','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-13 13:32:40
