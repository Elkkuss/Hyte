-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE SleepEntries (
    sleep_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_date DATE NOT NULL,
    bedtime DATETIME NOT NULL,
    wake_time DATETIME NOT NULL,
    sleep_hours DECIMAL(4,2),
    sleep_quality VARCHAR(50),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);



-- Insert sample data

INSERT INTO Users (username, password, email, created_at, user_level) VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', '2024-01-01 09:00:00', 'regular'),
('janedoe', 'hashed_password', 'janedoe@example.com', '2024-01-02 10:00:00', 'admin'),
('alice_jones', 'hashed_password', 'alice@example.com', '2024-01-04 08:30:00', 'regular'),
('bob_brown', 'hashed_password', 'bob@example.com', '2024-01-05 07:45:00', 'regular');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
(1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great workout session', '2024-01-10 20:00:00'),
(2, '2024-01-11', 'Satisfied', 65.0, 7, 'Met with friends, had a good time', '2024-01-11 21:00:00'),
(3, '2024-01-12', 'Tired', 68.0, 6, 'Work was demanding', '2024-01-12 22:00:00'),
(4, '2024-01-13', 'Energetic', 55.0, 9, 'Went for a morning run', '2024-01-13 18:00:00'),
(4, '2024-01-14', 'Relaxed', 75.0, 8, 'Spent the day reading', '2024-01-14 19:00:00');

INSERT INTO SleepEntries (user_id, sleep_date, bedtime, wake_time, sleep_hours, sleep_quality, notes) VALUES
(1, '2026-01-28', '2026-01-27 23:30:00', '2026-01-28 07:00:00', 7.50, 'Good', 'Slept through the night'),
(2, '2026-01-28', '2026-01-27 01:15:00', '2026-01-28 06:15:00', 5.00, 'Fair', 'Late night studying'),
(3, '2026-01-28', '2026-01-27 22:45:00', '2026-01-28 06:45:00', 8.00, 'Great', 'Very restful sleep'),
(4, '2026-01-28', '2026-01-27 00:30:00', '2026-01-28 05:45:00', 5.25, 'Poor', 'Woke up multiple times');



