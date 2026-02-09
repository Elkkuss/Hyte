CREATE USER 'elkku'@'localhost' IDENTIFIED BY 'Elkku.db2';
GRANT ALL PRIVILEGES ON `elkku`.* TO 'HealthDiary'@'localhost';
FLUSH PRIVILEGES;
