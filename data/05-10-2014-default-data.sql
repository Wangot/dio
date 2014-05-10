INSERT INTO `event` (`name`, `description`, `id`) VALUES
('Seismologic', 'Seismologic Description', 1),
('Volcanic', 'Volcanic', 2),
('Weather', 'Weather', 3),
('Climate', 'Climate', 4);



INSERT INTO `field` (`id`, `event_id`, `name`, `description`) VALUES
(1, 1, 'Intensity', 'The intensity of an earthquake at a particular locality indicates the violence of earth motion produced there by the earthquake. '),
(2, 3, 'Chance of precipitation', 'Chance of precipitation'),
(3, 3, 'Wind', 'Wind'),
(4, 3, 'Temperature', 'Temperature'),
(5, 3, 'Humidity', 'Humidity'),
(6, 3, 'Atmospheric pressure', 'Atmospheric pressure'),
(7, 3, 'Cloudiness', 'Cloudiness'),
(8, 3, 'Sunrise', 'Time of Sunrise'),
(9, 3, 'Moonrise', 'Time of Moonrise');

INSERT INTO `event_field` (`id`, `event_id`, `event_history_id`, `field_id`, `value`) VALUES
(1, 1, 1, 1, '2'),
(2, 3, 3, 2, '50%'),
(3, 3, 3, 3, '19 km/h'),
(4, 3, 3, 4, '28 °C'),
(5, 3, 3, 5, '84%'),
(6, 3, 3, 6, ''),
(7, 3, 3, 7, ''),
(8, 3, 3, 8, '7:06 am'),
(9, 3, 3, 9, '6:06 pm'),
(10, 3, 8, 2, '50%'),
(11, 3, 8, 3, '19 km/h'),
(12, 3, 8, 4, '28 °C'),
(13, 3, 8, 5, '84%'),
(14, 3, 8, 8, '7:06 am'),
(15, 3, 8, 9, '6:06 pm'),
(16, 3, 9, 2, '50%'),
(17, 3, 9, 3, '19 km/h'),
(18, 3, 9, 4, '28 °C'),
(19, 3, 9, 5, '84%'),
(20, 3, 9, 8, '7:06 am'),
(21, 3, 9, 9, '6:06 pm'),
(22, 3, 10, 2, '50%'),
(23, 3, 10, 3, '19 km/h'),
(24, 3, 10, 4, '28 °C'),
(25, 3, 10, 5, '84%'),
(26, 3, 10, 8, '7:06 am'),
(27, 3, 10, 9, '6:06 pm'),
(28, 1, 11, 1, '2'),
(29, 3, 12, 2, '50%'),
(30, 3, 12, 3, '19 km/h'),
(31, 3, 12, 4, '28 °C'),
(32, 3, 12, 5, '84%'),
(33, 3, 12, 8, '7:06 am'),
(34, 3, 12, 9, '6:06 pm'),
(35, 3, 13, 2, '50%'),
(36, 3, 13, 3, '19 km/h'),
(37, 3, 13, 4, '28 °C'),
(38, 3, 13, 5, '84%'),
(39, 3, 13, 8, '7:06 am'),
(40, 3, 13, 9, '6:06 pm'),
(41, 3, 14, 2, '50%'),
(42, 3, 14, 3, '19 km/h'),
(43, 3, 14, 4, '28 °C'),
(44, 3, 14, 8, '7:06 am'),
(45, 3, 14, 9, '6:06 pm'),
(46, 3, 15, 2, '50%'),
(47, 3, 15, 3, '19 km/h'),
(48, 3, 15, 4, '28 °C'),
(49, 3, 15, 5, '84%'),
(50, 3, 15, 8, '7:06 am'),
(51, 3, 15, 9, '6:06 pm');

INSERT INTO `event_history` (`id`, `event_id`, `event_level_id`, `title`, `created`) VALUES
(1, 1, 1, 'Seismologic Sample', '2013-08-13 15:10:20'),
(2, 2, 9, 'Volcanic Sample', '2013-08-13 23:20:28'),
(3, 3, 15, 'Weather Sample', '2013-08-14 00:40:36'),
(4, 4, 20, 'Climate Sample', '2013-08-14 00:20:21'),
(5, 2, 10, 'Volcanic Sample', '2013-09-13 11:18:36'),
(6, 2, 10, 'Volcanic Sample', '2013-09-16 03:04:32'),
(7, 2, 10, 'Volcanic Sample', '2013-09-16 03:04:34'),
(8, 3, 15, 'Weather Sample', '2013-09-16 03:05:05'),
(9, 3, 15, 'Weather Sample', '2013-09-16 03:05:42'),
(10, 3, 15, 'Weather Sample', '2013-09-16 03:05:45'),
(11, 1, 1, 'Seismologic Sample', '2013-09-17 12:45:29'),
(12, 3, 15, 'Weather Sample', '2013-09-17 12:46:44'),
(13, 3, 15, 'Weather Sample', '2013-09-18 10:36:15'),
(14, 3, 15, 'Weather Sample', '2013-10-09 05:57:32'),
(15, 3, 15, 'Weather Sample', '2013-10-09 05:57:44');


INSERT INTO `event_level` (`id`, `event_id`, `title`, `description`, `image`, `created`, `updated`) VALUES
(1, 1, 'Magnitude 0-2', 'Not felt by people. Not felt except by a very few under especially favorable conditions.', 'magnitude-0-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(2, 1, 'Magnitude 2-3', 'Felt by little people. Felt only by a few persons at rest, especially on upper floors of buildings.', 'magnitude-2-3.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(3, 1, 'Magnitude 3-4', 'Cieling lights swing. Felt quite noticeably by persons indoors, especially on upper floors of buildings. Many people do not recognize it as an earthquake. Standing motor cars may rock slightly. Vibrations similar to the passing of a truck. Duration estimated.', 'magnitude-3-4.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(4, 1, 'Magnitude 4-5', 'Walls crack. Felt indoors by many, outdoors by few during the day. At night, some awakened. Dishes, windows, doors disturbed; walls make cracking sound. Sensation like heavy truck striking building. Standing motor cars rocked noticeably.', 'magnitude-4-5.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(5, 1, 'Magnitude 5-6', 'Furniture moves. Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster. Damage slight.', 'magnitude-5-6.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(6, 1, 'Magnitude 6-7', 'Some buildings collapse. Damage negligible in buildings of good design and construction; slight to moderate in well-built ordinary structures; considerable damage in poorly built or badly designed structures; some chimneys broken.', 'magnitude-6-7.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(7, 1, 'Magnitude 7-8', 'Many building destroyed. Some well-built wooden structures destroyed; most masonry and frame structures destroyed with foundations. Rails bent.Few, if any (masonry) structures remain standing. Bridges destroyed. Rails bent greatly.', 'magnitude-7-8.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(8, 1, 'Magnitude 8-UP', 'Total destruction of buildings, bridges and roads. Damage total. Lines of sight and level are distorted. Objects thrown into the air.', 'magnitude-8-up.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(9, 2, 'Alert Level 0', 'No Alert.Quiet. No eruption in the foreseeable future.', 'alert-level-0.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(10, 2, 'Alert Level 1', 'Abnormal.Low level unrest. No eruption imminent.', '2013-09-13_magnitude-0-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(11, 2, 'Alert Level 2', 'Increasing Unrest.Moderate unrest. Unrest probably of magmatic origin, could eventually lead to eruption.', 'alert-level-2.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(12, 2, 'Alert Level 3', 'Relatively high unrest. Magma is close to the crater.Increasing Tendency Towards Eruption.', 'alert-level-3.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(13, 2, 'Alert Level 4', 'Intense unrest. Hazardous eruption is possible within days.Hazardous Eruption Imminent.', 'alert-level-4.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(14, 2, 'Alert Level 5', 'Hazardous eruption ongoing.Hazardous Eruption.', 'alert-level-5.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(15, 3, 'Rain', '', 'rain.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(16, 3, 'Sunny', '', 'sunny.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(17, 3, 'Clear', '', 'clear.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(18, 4, 'Winter', '', 'winter.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(19, 4, 'Spring', '', 'spring.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(20, 4, 'Summer', '', 'summer.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00'),
(21, 4, 'Fall', '', 'fall.png', '2013-09-11 20:31:42', '0000-00-00 00:00:00');