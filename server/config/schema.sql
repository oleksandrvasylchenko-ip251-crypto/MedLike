-- schema.sql
-- Виконати один раз на MySQL-сервері: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS medlike CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medlike;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  service VARCHAR(100) NOT NULL,
  note VARCHAR(500) NULL,
  status ENUM('new', 'confirmed', 'cancelled', 'done') NOT NULL DEFAULT 'new',
  telegram_message_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS call_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(30) NOT NULL,
  wait_minutes INT NOT NULL DEFAULT 10,
  status ENUM('pending', 'called', 'cancelled') NOT NULL DEFAULT 'pending',
  telegram_message_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
