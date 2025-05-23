# my_proj – Flask + MySQL API

## 📌 Project Description

This project is a backend API built with **Flask** and **MySQL**, based on an ER diagram and relational database schema. It supports full CRUD operations on the defined entities. The application interacts with a MySQL database (tested with "phpMyAdmin locally") and is structured for clean code, easy setup, and API testing.

-----------------------------------------------------------------------------------------------------

## 🧰 Tech Stack

- **Backend Framework:** Flask (Python)  
- **Database:** MySQL (local via phpMyAdmin)  
- **ORM:** SQLAlchemy  
- **Testing Tool:** Postman / curl  
- **Version Control:** Git (hosted on GitHub or provided as ZIP)  
- **Environment Management:** `venv` (Python virtual environment)  

-----------------------------------------------------------------------------------------------------

## ⚙️ Flask + MySQL Setup Instructions

Follow these steps to get your backend API up and running locally using Flask and MySQL.

FLASK
Install 5 requirments on flask
1.pypi/project/Flask/
2.pypi/project/Flask-SQLAlchemy/
3.pypi/project/mysqlclient/
4.pypi/project/flask-marshmallow/
5.pypi/project/marshmallow-sqlalchemy/

MYSQL
Install XAMP

Download XAMPP
    -Visit https://www.apachefriends.org/index.html
    -Select your OS (Windows/macOS/Linux)
    -Download the latest XAMPP installer
Install XAMPP
    -Run the downloaded installer
    -Follow the installation steps
    -Make sure MySQL component is selected
    -Complete the installation
Start MySQL Server
    -Open XAMPP Control Panel
    -Click Start next to MySQL
    -Optionally, start Apache if you need it
    -Ensure MySQL status shows Running
Open phpMyAdmin
    -Open your web browser
    -Go to http://localhost/phpmyadmin


Run your Flask app and ensure it connects successfully to your MySQL database
-----------------------------------------------------------------------------------------------------

### ✅ 1. Install Python

Make sure Python 3 is installed:
```bash
-python --version
-go to python destination to copy the path
-go to environment paste the to the path of your system
