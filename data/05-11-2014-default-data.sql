-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 11, 2014 at 12:26 PM
-- Server version: 5.5.31
-- PHP Version: 5.3.10-1ubuntu3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dio`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `title` varchar(255) NOT NULL,
  `content` longtext,
  `tags` longtext,
  `google_image_link` longtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`title`, `content`, `tags`, `google_image_link`, `created`, `updated`, `id`) VALUES
('test article', 'test article', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 1),
('test article', 'test ', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 2),
('test article', 'test', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 3),
('test article', 'test', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 4),
('test article', 'test', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 5),
('test', 'test', '', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 6),
('test', 'testst', 'test', 'http://maps.googleapis.com/maps/api/staticmap?center=leyte+province&zoom=8&size=170x180&maptype=roadmap&markers=color:red%7Clabel:A%7Cleyte+province&sensor=false', NULL, NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `article_attachment`
--

CREATE TABLE IF NOT EXISTS `article_attachment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `attachment_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `attachment_id` (`attachment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE IF NOT EXISTS `attachment` (
  `filename` varchar(255) NOT NULL,
  `download_url` longtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `type` enum('EMAIL','MOBILE_NUMBER','OTHERS_EMAIL','OTHERS_MOBILE_NUMBER') DEFAULT NULL,
  `value` longtext NOT NULL,
  `description` longtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`type`, `value`, `description`, `created`, `updated`, `id`, `user_id`) VALUES
('EMAIL', 'erickson.leynes@98labs.com', NULL, NULL, NULL, 1, 1),
('EMAIL', 'raymande.leano@98labs.com', NULL, NULL, NULL, 2, 1),
('EMAIL', 'buena.montalbo@98labs.com', NULL, NULL, NULL, 3, 1),
('EMAIL', 'christian.balagbag@98labs.com', NULL, NULL, NULL, 4, 1),
('OTHERS_MOBILE_NUMBER', '09999848575', NULL, NULL, NULL, 5, 1),
('OTHERS_EMAIL', 'christian.balagbag@98labs.com', NULL, NULL, NULL, 6, 1),
('OTHERS_EMAIL', 'raymande.leano@98labs.com', NULL, NULL, NULL, 7, 1),
('OTHERS_EMAIL', 'erickson.leynes@98labs.com', NULL, NULL, NULL, 8, 1),
('OTHERS_EMAIL', 'buena.montalbo@98labs.com', NULL, NULL, NULL, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`name`, `description`, `id`) VALUES
('Seismologic', 'Seismologic Description', 1),
('Volcanic', 'Volcanic', 2),
('Weather', 'Weather', 3),
('Climate', 'Climate', 4);

-- --------------------------------------------------------

--
-- Table structure for table `event_article`
--

CREATE TABLE IF NOT EXISTS `event_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `event_history_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `event_history_id` (`event_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `event_field`
--

CREATE TABLE IF NOT EXISTS `event_field` (
  `value` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  `event_history_id` int(10) unsigned NOT NULL,
  `field_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `event_history_id` (`event_history_id`),
  KEY `field_id` (`field_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `event_field`
--

INSERT INTO `event_field` (`value`, `id`, `event_id`, `event_history_id`, `field_id`) VALUES
('2', 1, 1, 1, 1),
('50%', 2, 3, 3, 2),
('19 km/h', 3, 3, 3, 3),
('28 °C', 4, 3, 3, 4),
('84%', 5, 3, 3, 5),
('', 6, 3, 3, 6),
('', 7, 3, 3, 7),
('7:06 am', 8, 3, 3, 8),
('6:06 pm', 9, 3, 3, 9),
('50%', 10, 3, 8, 2),
('19 km/h', 11, 3, 8, 3),
('28 °C', 12, 3, 8, 4),
('84%', 13, 3, 8, 5),
('7:06 am', 14, 3, 8, 8),
('6:06 pm', 15, 3, 8, 9),
('50%', 16, 3, 9, 2),
('19 km/h', 17, 3, 9, 3),
('28 °C', 18, 3, 9, 4),
('84%', 19, 3, 9, 5),
('7:06 am', 20, 3, 9, 8),
('6:06 pm', 21, 3, 9, 9),
('50%', 22, 3, 10, 2),
('19 km/h', 23, 3, 10, 3),
('28 °C', 24, 3, 10, 4),
('84%', 25, 3, 10, 5),
('7:06 am', 26, 3, 10, 8),
('6:06 pm', 27, 3, 10, 9),
('2', 28, 1, 11, 1),
('50%', 29, 3, 12, 2),
('19 km/h', 30, 3, 12, 3),
('28 °C', 31, 3, 12, 4),
('84%', 32, 3, 12, 5),
('7:06 am', 33, 3, 12, 8),
('6:06 pm', 34, 3, 12, 9),
('50%', 35, 3, 13, 2),
('19 km/h', 36, 3, 13, 3),
('28 °C', 37, 3, 13, 4),
('84%', 38, 3, 13, 5),
('7:06 am', 39, 3, 13, 8),
('6:06 pm', 40, 3, 13, 9),
('50%', 41, 3, 14, 2),
('19 km/h', 42, 3, 14, 3),
('28 °C', 43, 3, 14, 4),
('7:06 am', 44, 3, 14, 8),
('6:06 pm', 45, 3, 14, 9),
('50%', 46, 3, 15, 2),
('19 km/h', 47, 3, 15, 3),
('28 °C', 48, 3, 15, 4),
('84%', 49, 3, 15, 5),
('7:06 am', 50, 3, 15, 8),
('6:06 pm', 51, 3, 15, 9);

-- --------------------------------------------------------

--
-- Table structure for table `event_history`
--

CREATE TABLE IF NOT EXISTS `event_history` (
  `title` varchar(500) NOT NULL,
  `description` longtext,
  `created` datetime DEFAULT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  `event_level_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `event_level_id` (`event_level_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `event_history`
--

INSERT INTO `event_history` (`title`, `description`, `created`, `latitude`, `longitude`, `id`, `event_id`, `event_level_id`) VALUES
('Seismologic Sample', NULL, '2014-05-11 15:10:20', '', '', 1, 1, 1),
('Volcanic Sample', NULL, '2013-05-10 23:20:28', '', '', 2, 2, 9),
('Weather Sample', NULL, '2013-08-14 00:40:36', '', '', 3, 3, 15),
('Climate Sample', NULL, '2013-08-14 00:20:21', '', '', 4, 4, 20),
('Volcanic Sample', NULL, '2013-09-13 11:18:36', '', '', 5, 2, 10),
('Volcanic Sample', NULL, '2013-09-16 03:04:32', '', '', 6, 2, 10),
('Volcanic Sample', NULL, '2013-09-16 03:04:34', '', '', 7, 2, 10),
('Weather Sample', NULL, '2013-09-16 03:05:05', '', '', 8, 3, 15),
('Weather Sample', NULL, '2013-09-16 03:05:42', '', '', 9, 3, 15),
('Weather Sample', NULL, '2013-09-16 03:05:45', '', '', 10, 3, 15),
('Seismologic Sample', NULL, '2013-09-17 12:45:29', '', '', 11, 1, 1),
('Weather Sample', NULL, '2013-09-17 12:46:44', '', '', 12, 3, 15),
('Weather Sample', NULL, '2013-09-18 10:36:15', '', '', 13, 3, 15),
('Weather Sample', NULL, '2013-10-09 05:57:32', '', '', 14, 3, 15),
('Weather Sample', NULL, '2013-10-09 05:57:44', '', '', 15, 3, 15),
('Report from web application...', 'test', '2014-05-11 11:32:43', '14.715788916205568', '121.29715136718755', 16, 1, 1),
('Report from web application...', 'test', '2014-05-11 11:37:28', '14.944126702516368', '120.31936816406255', 17, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event_level`
--

CREATE TABLE IF NOT EXISTS `event_level` (
  `title` varchar(500) NOT NULL,
  `description` longtext,
  `image` longtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `event_level`
--

INSERT INTO `event_level` (`title`, `description`, `image`, `created`, `updated`, `id`, `event_id`) VALUES
('Magnitude 0-2', 'Not felt by people. Not felt except by a very few under especially favorable conditions.', 'magnitude-0-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 1, 1),
('Magnitude 2-3', 'Felt by little people. Felt only by a few persons at rest, especially on upper floors of buildings.', 'magnitude-2-3.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 2, 1),
('Magnitude 3-4', 'Cieling lights swing. Felt quite noticeably by persons indoors, especially on upper floors of buildings. Many people do not recognize it as an earthquake. Standing motor cars may rock slightly. Vibrations similar to the passing of a truck. Duration estimated.', 'magnitude-3-4.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 3, 1),
('Magnitude 4-5', 'Walls crack. Felt indoors by many, outdoors by few during the day. At night, some awakened. Dishes, windows, doors disturbed; walls make cracking sound. Sensation like heavy truck striking building. Standing motor cars rocked noticeably.', 'magnitude-4-5.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 4, 1),
('Magnitude 5-6', 'Furniture moves. Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster. Damage slight.', 'magnitude-5-6.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 5, 1),
('Magnitude 6-7', 'Some buildings collapse. Damage negligible in buildings of good design and construction; slight to moderate in well-built ordinary structures; considerable damage in poorly built or badly designed structures; some chimneys broken.', 'magnitude-6-7.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 6, 1),
('Magnitude 7-8', 'Many building destroyed. Some well-built wooden structures destroyed; most masonry and frame structures destroyed with foundations. Rails bent.Few, if any (masonry) structures remain standing. Bridges destroyed. Rails bent greatly.', 'magnitude-7-8.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 7, 1),
('Magnitude 8-UP', 'Total destruction of buildings, bridges and roads. Damage total. Lines of sight and level are distorted. Objects thrown into the air.', 'magnitude-8-up.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 8, 1),
('Alert Level 0', 'No Alert.Quiet. No eruption in the foreseeable future.', 'alert-level-0.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 9, 2),
('Alert Level 1', 'Abnormal.Low level unrest. No eruption imminent.', '2013-09-13_magnitude-0-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 10, 2),
('Alert Level 2', 'Increasing Unrest.Moderate unrest. Unrest probably of magmatic origin, could eventually lead to eruption.', 'alert-level-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 11, 2),
('Alert Level 3', 'Relatively high unrest. Magma is close to the crater.Increasing Tendency Towards Eruption.', 'alert-level-3.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 12, 2),
('Alert Level 4', 'Intense unrest. Hazardous eruption is possible within days.Hazardous Eruption Imminent.', 'alert-level-4.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 13, 2),
('Alert Level 5', 'Hazardous eruption ongoing.Hazardous Eruption.', 'alert-level-5.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 14, 2),
('Rain', '', 'rain.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 15, 3),
('Sunny', '', 'sunny.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 16, 3),
('Clear', '', 'clear.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 17, 3),
('Winter', '', 'winter.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 18, 4),
('Spring', '', 'spring.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 19, 4),
('Summer', '', 'summer.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 20, 4),
('Fall', '', 'fall.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00', 21, 4);

-- --------------------------------------------------------

--
-- Table structure for table `event_media`
--

CREATE TABLE IF NOT EXISTS `event_media` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int(10) unsigned NOT NULL,
  `event_history_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `event_history_id` (`event_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE IF NOT EXISTS `field` (
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `field`
--

INSERT INTO `field` (`name`, `description`, `id`, `event_id`) VALUES
('Intensity', 'The intensity of an earthquake at a particular locality indicates the violence of earth motion produced there by the earthquake. ', 1, 1),
('Chance of precipitation', 'Chance of precipitation', 2, 3),
('Wind', 'Wind', 3, 3),
('Temperature', 'Temperature', 4, 3),
('Humidity', 'Humidity', 5, 3),
('Atmospheric pressure', 'Atmospheric pressure', 6, 3),
('Cloudiness', 'Cloudiness', 7, 3),
('Sunrise', 'Time of Sunrise', 8, 3),
('Moonrise', 'Time of Moonrise', 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE IF NOT EXISTS `media` (
  `type` enum('IMAGE','VIDEO') DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `download_url` longtext,
  `description` longtext,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `status` varchar(40) DEFAULT 'INACTIVE',
  `activation_code` varchar(100) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `email`, `display_name`, `status`, `activation_code`, `id`) VALUES
('raymande.leano_98abs.com', 'b1e066e7dd7717e2fa48f07df6207d42', 'raymande.leano@98abs.com', 'raymande.leano_98abs.com', 'ACTIVE', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_alert_setting`
--

CREATE TABLE IF NOT EXISTS `user_alert_setting` (
  `type` enum('SYSTEM','HELP') DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `contact_id` int(10) unsigned NOT NULL,
  `event_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `contact_id` (`contact_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

--
-- Dumping data for table `user_alert_setting`
--

INSERT INTO `user_alert_setting` (`type`, `id`, `user_id`, `contact_id`, `event_id`) VALUES
('SYSTEM', 1, 1, 1, 1),
('SYSTEM', 2, 1, 2, 1),
('SYSTEM', 3, 1, 3, 1),
('SYSTEM', 4, 1, 4, 1),
('SYSTEM', 5, 1, 1, 2),
('SYSTEM', 6, 1, 2, 2),
('SYSTEM', 7, 1, 3, 2),
('SYSTEM', 8, 1, 4, 2),
('SYSTEM', 9, 1, 1, 3),
('SYSTEM', 10, 1, 2, 3),
('SYSTEM', 11, 1, 3, 3),
('SYSTEM', 12, 1, 4, 3),
('SYSTEM', 13, 1, 1, 4),
('SYSTEM', 14, 1, 2, 4),
('SYSTEM', 15, 1, 3, 4),
('SYSTEM', 16, 1, 4, 4),
('HELP', 17, 1, 5, 1),
('HELP', 18, 1, 6, 1),
('HELP', 19, 1, 7, 1),
('HELP', 20, 1, 8, 1),
('HELP', 21, 1, 9, 1),
('HELP', 22, 1, 5, 2),
('HELP', 23, 1, 6, 2),
('HELP', 24, 1, 7, 2),
('HELP', 25, 1, 8, 2),
('HELP', 26, 1, 9, 2),
('HELP', 27, 1, 5, 3),
('HELP', 28, 1, 6, 3),
('HELP', 29, 1, 7, 3),
('HELP', 30, 1, 8, 3),
('HELP', 31, 1, 9, 3),
('HELP', 32, 1, 5, 4),
('HELP', 33, 1, 6, 4),
('HELP', 34, 1, 7, 4),
('HELP', 35, 1, 8, 4),
('HELP', 36, 1, 9, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_event_history`
--

CREATE TABLE IF NOT EXISTS `user_event_history` (
  `title` varchar(500) NOT NULL,
  `status` enum('UNREAD','READ') DEFAULT NULL,
  `description` longtext,
  `note` longtext,
  `created` datetime DEFAULT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `event_id` int(10) unsigned NOT NULL,
  `event_level_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `event_level_id` (`event_level_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user_event_history`
--

INSERT INTO `user_event_history` (`title`, `status`, `description`, `note`, `created`, `latitude`, `longitude`, `id`, `event_id`, `event_level_id`, `user_id`) VALUES
('title', '', 'test', 'this is a sample note', '2014-05-11 10:19:27', 'latitude', 'longitude', 1, 1, 1, 1),
('Report from web application...', '', 'this is a decription', 'Hello there sexy', '2014-05-11 11:14:59', '14.66796689573706', '121.17630175781255', 2, 1, 1, 2),
('Report from web application...', '', 'test', 'Hello there sexy', '2014-05-11 11:18:55', '14.750320525675136', '120.42373828125005', 3, 2, 1, 2),
('Report from web application...', '', 'test', 'Hello there sexy', '2014-05-11 11:20:36', '14.386137394014595', '121.5690629882813', 4, 4, 1, 2),
('Report from web application...', '', 'test', 'Hello there sexy', '2014-05-11 11:21:19', '14.07997652406471', '121.56631640625005', 5, 3, 1, 2),
('Report from web application...', '', 'test', 'Hello there sexy', '2014-05-11 11:22:39', '14.223790688387021', '120.86319140625005', 6, 2, 1, 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
