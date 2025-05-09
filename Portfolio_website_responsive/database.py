### **database.py** (MySQL Connection Setup)

import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Karthik@143",
    database="mydb"
)
cursor = db.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    visit_time DATETIME NOT NULL
)
""")
db.commit()