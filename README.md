# Student-Enrollment-using-JPDB

A simple, fast, and secure web application built using HTML, CSS, JavaScript, jQuery, and JSONPowerDB for storing and managing student enrollment records.

This project is designed according to Login2Explore (JSONPowerDB) assignment requirements and includes:
✔ Insert (Save) student data
✔ Fetch student by Roll No
✔ Update student data
✔ Auto-disable/enable form fields
✔ Uses JPDB IML / IRL APIs

## 🚀 Project Features
✅ ### 1. Add New Student

Saves student record using JPDB PUT API

Only allowed if roll no does not exist in DB

### ✅ 2. Search Student By Roll No

Uses JPDB GET API

If record exists → loads data

If not → allows creating new record

### ✅ 3. Update Student Data

Works only if roll number already exists

Uses JPDB UPDATE API

### ✅ 4. Form Auto-Control System

Save button disabled if student exists

Update button disabled for new record

Fields enable/disable automatically based on status

### ✅ 5. Smart Validations

Roll No / Name / Class / Address must not be empty


## 🛠️ Tech Stack
Component	Technology
Frontend	HTML, CSS, JavaScript, jQuery
Backend	JSONPowerDB
API Used	JPDB IML / IRL
Database	School-DB
Relation/Table	Student-Table

## 🧩 Project Folder Structure

```
Student-Enrollment/
│
├── index.html        # UI Form
├── script.js         # All JavaScript + JPDB integration
└── README.md         # Project documentation
```

## JSONPowerDB API Reference
🔹 PUT (Insert)
```bash
cmd: "PUT"
```
🔹 GET (Search by ID)
```bash
cmd: "GET"
```
🔹 UPDATE (Modify existing record)
```bash
cmd: "UPDATE"
```

## 📥 How to Run the Project

### Step 1: Clone the repository
```bash
git clone -- https://github.com/Arijitdey27/Student-Enrollment-using-JPDB
```

### Step 2: Open the project
```bash
cd Student-Enrollment-using-JPDB
```

### Step 3: Run

Simply open index.html in any browser.

No server required — JPDB works via API calls.


## ⚙️ Important Configurations

Inside script.js, configure your constants:

```bash
const jpdbBaseUrl = "http://api.login2explore.com:5577";
const jpdbIrl = "/api/irl";
const jpdbIml = "/api/iml";
const DBName = "School-DB";
const relationDB = "Student-Table";
const connToken = "<your_connection_token>";
```

## 📚 Learning from This Project

Working with JSONPowerDB (NoSQL)

Using IML/IRL commands

Real-time form validation

Managing UI state based on API responses

LocalStorage usage for rec_no tracking

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

## 📝 License

This project is free to use for educational and learning purposes.

## 🎉 Thank You!

If you like this project, don't forget to ⭐ star the repo!
