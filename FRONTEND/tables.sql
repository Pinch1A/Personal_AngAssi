CREATE DATABASE `angularcode_products` 
--
-- Database: `angularcode_products`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignar`
--
CREATE TABLE `assignar`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `creation` date NOT NULL,
  `updated` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assignar`
--

INSERT INTO `assignar`(`id`,`name`,`description`,`creation`,`updated`)VALUES
(1,'One','Description 1','2015-03-03',null ),
(2,'Two','Description 2','2015-03-03',null ),
(3,'Three','Description 3','2015-03-03', null),
(4,'Four','Description 4','2015-03-03', null );
