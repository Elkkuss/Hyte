CREATE USER 'healthdiary'@'localhost' IDENTIFIED BY 'healthdiary';
GRANT ALL PRIVILEGES ON `healthdiary`.* TO 'healthdiary'@'localhost';
FLUSH PRIVILEGES;
