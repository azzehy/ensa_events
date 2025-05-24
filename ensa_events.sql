-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 24, 2025 at 05:50 PM
-- Server version: 8.3.0
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ensa_events`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `capacity` int UNSIGNED DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `time`, `location`, `image_path`, `capacity`, `category`, `created_at`, `updated_at`) VALUES
(6, '36-Hour Coding Marathon', 'Computer science students compete to build innovative apps with prizes from tech sponsors.', '2025-05-29', '10:30:00', 'Engineering Building', 'events/RGIgBRK1v7BdjawKKxKMbqjXDVnGLdjmELaf87Qg.jpg', 100, 'Technology', '2025-05-24 02:47:07', '2025-05-24 02:47:07'),
(5, '2025 Freshman Welcome Week', 'Orientation program for new students featuring campus tours, faculty meet-and-greets, and social activities.', '2025-05-31', '10:00:00', 'University Chouaib doukkali', 'events/Ep6fgI6iWT8o6ZDceziGFsKlVBCiADf5nXVuZ2BF.jpg', 1500, 'Student Life', '2025-05-24 02:45:28', '2025-05-24 02:45:28'),
(7, 'International Student Festival', 'Celebration of global cultures with food, performances, and traditional dress.', '2025-06-02', '11:00:00', 'Main Auditorium', 'events/EY8VyPwPNUa14h4m6sCfEJG7QZuXURknbR6vlJq3.jpg', 250, 'Diversity', '2025-05-24 02:48:47', '2025-05-24 02:48:47'),
(8, 'Remise des diplomes', 'Plongez dans l’émotion pure de la remise de diplôme des brillants lauréats J23 de l’ENSAJ !Dans cette vidéo captivante, l’Association des Élèves Ingénieurs de l’ENSAJ vous invite à revivre les moments de fierté, de joie et d’accomplissement alors que nos étudiants franchissent le seuil vers de nouveaux horizons.', '2025-06-04', '00:00:00', 'Theatre Afifi', 'events/hRQ9Iro7GPLXLx73m1NdyE7zwn18VnBm0pfiBYHz.jpg', 300, 'Ceremonie', '2025-05-24 02:52:16', '2025-05-24 02:52:16'),
(9, '5th Annual ENSA Robotics Competition', 'Inter-departmental robotics competition where teams design autonomous robots to solve industrial challenges. Sponsored by Moroccan tech companies.', '2025-06-06', '10:00:00', 'ENSA Robotics Lab, Building C', 'events/uahd2tB7SBdTCJ173lqjB8O4NBt2RYL9g8XbK4Si.jpg', 200, 'Engineering', '2025-05-24 02:53:46', '2025-05-24 02:53:46'),
(10, 'Solar Energy Innovation Workshop', 'Hands-on training in photovoltaic system design with practical installations on campus. Organized by ENSA\\\'s Green Engineering Club.', '2025-06-07', '10:30:00', 'ENSA Renewable Energy Lab', 'events/ewa5yXPVehhv9ekgTgOxRBNFbBnJlSPT9APrFTrl.jpg', 30, 'Workshop', '2025-05-24 02:55:07', '2025-05-24 02:55:07'),
(11, 'OCP Factory Simulation Project', 'Final-year students present optimized production line models for Jorf Lasfar industrial complex.', '2025-06-08', '09:00:00', 'Main Auditorium', 'events/9xOxqbH18JaAJjkHm3QYhrLnewNWsjBeIErGZf4B.jpg', 150, 'Industrial', '2025-05-24 02:56:20', '2025-05-24 02:56:20'),
(12, 'Doukala Great Debaters', 'l’ENSAJ a vibré au rythme des mots et des idées lors du Doukkala Debate Congress 2ième édition , un événement grandiose orchestré par le club The Great Debater de l’Ecole Nationale des Sciences Appliquées d’El Jadida sous l’égide de l’université Chouaïb Doukkali.', '2025-06-12', '11:00:00', 'Main Auditorium', 'events/WABLCtRtTfktVHIZtmKau59VY7JpfGHZKUyObpsP.jpg', 150, 'Competiton', '2025-05-24 02:59:58', '2025-05-24 02:59:58'),
(13, 'ISAOP-25 – 19th International Symposium on Advanced Organic Photonics', 'This prestigious event brings together leading scientists, researchers, and experts from across the globe to discuss cutting-edge advances in organic and hybrid photonic materials, devices, and related technologies.', '2025-06-12', '09:00:00', 'Main Auditorium', 'events/tWASwdMZKgwr7zSMjbN21XogNjdeh4R8T00AvELt.jpg', 200, 'Seminar', '2025-05-24 03:01:15', '2025-05-24 03:01:15'),
(15, 'ELECTRI GENIUS, la première compétition dédiée aux futurs ingénieurs.', 'ELECTRI GENIUS, la première compétition dédiée aux futurs ingénieurs, ouvre ses portes sous le thème « la résilience face aux catastrophes naturelles ».\r\nL’événement invite à repenser la manière de prévenir, préparer, répondre et récupérer face aux crises naturelles.', '2025-06-01', '09:00:00', 'Hall', 'events/YUcSv518BVYBlPpK0MaccpkW3Tps11fUOHaZu1bQ.jpg', 300, 'Competiton', '2025-05-24 03:04:44', '2025-05-24 03:05:18'),
(18, 'AI Bootcamp: Master the Future of Technology', 'Join ENSA’s intensive 3-day AI Bootcamp designed for engineering students to dive into cutting-edge artificial intelligence applications. Through hands-on workshops, you’ll build real-world AI models using Python and TensorFlow, with a special focus on Moroccan industry use cases like predictive maintenance for OCP facilities.', '2025-06-25', '11:00:00', 'Main Auditorium', 'events/AqaXubKfkPPtbtItBwckFtURiZBSYZmSdFOzTG7Q.png', 300, 'Technology', '2025-05-24 15:32:46', '2025-05-24 15:33:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb3_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_09_232045_create_personal_access_tokens_table', 1),
(5, '2025_05_09_232143_create_events_table', 1),
(6, '2025_05_09_232156_create_registrations_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb3_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb3_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(5, 'App\\Models\\User', 1, 'auth_token', '74b89b1d44e272a8922022f181775d12cd5a7eb98217db7e639b7f4b3b825320', '[\"*\"]', '2025-05-22 11:04:25', NULL, '2025-05-22 11:04:15', '2025-05-22 11:04:25'),
(25, 'App\\Models\\User', 7, 'auth_token', 'd25cdc1c50c3c137d9416859018c8c3ae7a8f02d4bc64d1b8bfd64c7265f2c55', '[\"*\"]', NULL, NULL, '2025-05-24 05:16:55', '2025-05-24 05:16:55'),
(26, 'App\\Models\\User', 7, 'auth_token', '58b1b0c56476f768e1a54d69ea3a92dbca9c531e14103dfca1ef33858a3a4364', '[\"*\"]', '2025-05-24 05:17:21', NULL, '2025-05-24 05:17:10', '2025-05-24 05:17:21'),
(32, 'App\\Models\\User', 8, 'auth_token', 'f20e7043f5e0d3fa7607f9ecc8f1fbaf1dfb8f5daca4f32d4fce1615d2854218', '[\"*\"]', NULL, NULL, '2025-05-24 15:24:50', '2025-05-24 15:24:50'),
(36, 'App\\Models\\User', 9, 'auth_token', 'c95f8e3304400a972c930c0b8728baf688a4b7848d4b3e96fa8bedae62b93c1a', '[\"*\"]', NULL, NULL, '2025-05-24 15:30:30', '2025-05-24 15:30:30');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `event_id` bigint UNSIGNED NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registrations_user_id_event_id_unique` (`user_id`,`event_id`),
  KEY `registrations_event_id_foreign` (`event_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`id`, `user_id`, `event_id`, `registered_at`, `created_at`, `updated_at`) VALUES
(4, 5, 5, '2025-05-24 04:21:13', '2025-05-24 03:21:13', '2025-05-24 03:21:13'),
(3, 5, 6, '2025-05-24 04:21:08', '2025-05-24 03:21:08', '2025-05-24 03:21:08'),
(5, 5, 15, '2025-05-24 04:21:17', '2025-05-24 03:21:17', '2025-05-24 03:21:17'),
(6, 5, 7, '2025-05-24 04:21:21', '2025-05-24 03:21:21', '2025-05-24 03:21:21'),
(7, 5, 11, '2025-05-24 04:21:25', '2025-05-24 03:21:25', '2025-05-24 03:21:25'),
(11, 5, 17, '2025-05-24 16:18:07', '2025-05-24 15:18:07', '2025-05-24 15:18:07'),
(12, 5, 13, '2025-05-24 16:18:29', '2025-05-24 15:18:29', '2025-05-24 15:18:29'),
(13, 2, 6, '2025-05-24 16:22:14', '2025-05-24 15:22:14', '2025-05-24 15:22:14'),
(14, 2, 15, '2025-05-24 16:22:25', '2025-05-24 15:22:25', '2025-05-24 15:22:25'),
(15, 2, 12, '2025-05-24 16:22:30', '2025-05-24 15:22:30', '2025-05-24 15:22:30'),
(16, 8, 6, '2025-05-24 16:25:36', '2025-05-24 15:25:36', '2025-05-24 15:25:36'),
(18, 9, 18, '2025-05-24 16:33:47', '2025-05-24 15:33:47', '2025-05-24 15:33:47');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb3_unicode_ci,
  `payload` longtext COLLATE utf8mb3_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('v8hKTmzqXBdJw1avGzTvr2uIMOhdudc6nDqYXPY0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTjg1VHJLMkpIclc2SURpMDZkczliMVdaYkxtb0pmYVRJTG1TTklaNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1748066821);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `role` enum('admin','student') COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT 'student',
  `remember_token` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Rahhal Errettahi', 'admin@ensa.ma', NULL, '$2y$12$UmldNqGjogZ6ByLwhXZCGuZjl05c5zS3aQYV3txC0eK6FfkfVpUVy', 'admin', NULL, '2025-05-19 07:56:34', '2025-05-24 15:31:40'),
(2, 'younes azzehizi', 'student@ensa.ma', NULL, '$2y$12$ufDWvZEpLJtwZqNaouN6J.9e0xkkbml9XZsQR2hvqJAT.jUcRo/Ru', 'student', NULL, '2025-05-19 07:56:34', '2025-05-24 03:18:15'),
(3, 'younes azzehizi', 'yazzzeh04@gmail.com', NULL, '$2y$12$rYBsrHV07XBDOZCWlAWRq.6n1IT.l8UtfJpd2RXCnBGq.z67w5EXu', 'student', NULL, '2025-05-19 08:19:20', '2025-05-19 08:19:20'),
(4, 'amira el azizi', 'student2@ensa.ma', NULL, '$2y$12$Yi0V8lR7jcEH32ZDKWOo6efZJpxV70Dyjdh8ilzRrkTGQMbqqjzB2', 'student', NULL, '2025-05-24 03:19:10', '2025-05-24 03:19:10'),
(5, 'saif mohamed bensat', 'student3@ensa.ma', NULL, '$2y$12$YS.Nc17WFBhUWGcfcKRH0.ZCg3XIzRG.k54.ATfO4HQp.WKTAyWN6', 'student', NULL, '2025-05-24 03:20:59', '2025-05-24 03:20:59'),
(8, 'younes AZZEHIZI', 'student20@ensa.ma', NULL, '$2y$12$ElyYb7M2Wve3s12I0ZBsBOY.1iYPX1reQdA5.DGUc/Wl0iP6qUp1u', 'student', NULL, '2025-05-24 15:24:50', '2025-05-24 15:25:23'),
(9, 'younes azzehizi', 'student10@ensa.ma', NULL, '$2y$12$akqBnyhgaxD.HzWCpdabAOSaqGjyQA3aeB9h/pU36.LYVmbU3blFW', 'student', NULL, '2025-05-24 15:30:30', '2025-05-24 15:30:54');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
