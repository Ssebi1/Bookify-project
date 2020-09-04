-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2020 at 11:24 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookify`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_title` varchar(255) NOT NULL,
  `book_author` varchar(255) NOT NULL,
  `book_category` varchar(255) NOT NULL,
  `book_link` varchar(255) NOT NULL,
  `book_progress` int(11) NOT NULL,
  `book_notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `user_id`, `book_title`, `book_author`, `book_category`, `book_link`, `book_progress`, `book_notes`) VALUES
(1, 1, '5 second rule', 'Mel Robins', 'Self-development', '', 100, '<p><br></p>'),
(2, 1, 'The power of habits', 'Mark Manson', 'Self-development', '', 57, ''),
(3, 1, 'Cracking the coding interviews', 'Umknown', 'IT', '', 0, ''),
(29, 1, 'JavaScript: The Definitive Guide', 'David Flanagan', 'Computers', 'https://books.google.com/books/about/JavaScript_The_Definitive_Guide.html?hl=&id=2weL0iAfrEMC', 0, 'This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in today\'s Web 2.0 applications. This book is both an example-driven programmer\'s guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript, including: Scripted HTTP and Ajax XML processing Client-side graphics using the canvas tag Namespaces in JavaScript--essential when writing complex programs Classes, closures, persistence, Flash, and JavaScript embedded in Java applications Part I explains the core JavaScript language in detail. If you are new to JavaScript, it will teach you the language. If you are already a JavaScript programmer, Part I will sharpen your skills and deepen your understanding of the language. Part II explains the scripting environment provided by web browsers, with a focus on DOM scripting with unobtrusive JavaScript. The broad and deep coverage of client-side JavaScript is illustrated with many sophisticated examples that demonstrate how to: Generate a table of contents for an HTML document Display DHTML animations Automate form validation Draw dynamic pie charts Make HTML elements draggable Define keyboard shortcuts for web applications Create Ajax-enabled tool tips Use XPath and XSLT on XML documents loaded with Ajax And much more Part III is a complete reference for core JavaScript. It documents every class, object, constructor, method, function, property, and constant defined by JavaScript 1.5 and ECMAScript Version 3. Part IV is a reference for client-side JavaScript, covering legacy web browser APIs, the standard Level 2 DOM API, and emerging standards such as the XMLHttpRequest object and the canvas tag. More than 300,000 JavaScript programmers around the world have madethis their indispensable reference book for building JavaScript applications. \'A must-have reference for expert JavaScript programmers...well-organized and detailed.\' -- Brendan Eich, creator of JavaScript'),
(30, 1, 'Think and Grow Rich', 'Napoleon Hill,Wyatt North', 'Business & Economics', 'https://books.google.com/books/about/Think_and_Grow_Rich.html?hl=&id=03CuBAAAQBAJ', 0, 'Think and Grow Rich is a motivational personal development and self-help book by Napoleon Hill. The book was heavily inspired by the work of Andrew Carnegie. While the title focuses on how to get rich, the author explains that the philosophy taught in the book can be used to help people succeed in all lines of work and to do or be almost anything they want.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_email`, `user_password`) VALUES
(1, 'Ssebi', 'sebidancau@yahoo.com', '$2a$08$srVwAEDPBoGf3NTwqwWPXOluv.Kfhyi5Zjcha9ajrF3nW7fO1x58u'),
(2, 'Test', 'test@yahoo.com', '$2a$08$iAi2URFBxPzcaYE7r0W2/uRCJVwwbXwpb1VgX6DBn0BlvrfJXPQ6K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
