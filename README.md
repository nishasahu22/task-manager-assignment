# Task Manager Web App (Node.js + Express + MySQL)

## Features
- Create Task (title, description, status)
- View all tasks
- Update task (edit / mark done)
- Delete task
- Data stored in MySQL

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL

## Database Setup
Run in MySQL Workbench:
```sql
CREATE DATABASE task_manager_db;
USE task_manager_db;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending','in-progress','done') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
