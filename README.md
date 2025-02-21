# QR Code Attendance System - Backend by Kislay Anand (@KisuZoid) 

## Overview
A **QR Code-based Event Attendance System** with JWT authentication, role-based access, and email verification. Users can register, generate QR codes for events, and mark attendance by scanning them. 

---
## 🚀 Features
### 🔐 Authentication & Security
✔ **JWT Authentication** - Secure login/logout with tokens  
✔ **Role-Based Access Control** - Admin, Organizer, and User roles  
✔ **Password Hashing** - Uses bcrypt for encryption  
✔ **Email Verification** - Users must verify email before login  
✔ **Password Reset** - Secure OTP-based reset  

### 📆 Event & Ticketing
✔ **Create & Manage Events** - Admin & organizers can create, update, and delete events  
✔ **QR Code Generation** - Unique QR for every user-event pair  
✔ **One-Time QR Usage** - Prevents multiple scans  
✔ **QR Code Validation** - Tracks scanned status  
✔ **Event Ticketing** - Users can generate tickets linked to QR  

### 📊 Attendance Tracking
✔ **Real-time Attendance Marking** - Scan QR for check-in  
✔ **Duplicate Prevention** - Stops multiple entries  
✔ **Attendance Logs** - Admins can track who attended  
✔ **ObjectId Validation** - Prevents invalid data input  

### 📧 Email Service
✔ **User Registration Confirmation**  
✔ **Password Reset Emails**  
✔ **Event Notifications**  

### 📡 API & Database
✔ **RESTful API** - Well-structured and documented  
✔ **MongoDB Integration** - Scalable database  
✔ **Optimized Indexing** - For faster query execution  
✔ **Error Handling Middleware** - Centralized error management  

---
## 📂 Folder Structure
```
📦 qr-code-generator
 ┣ 📂 config
 ┃ ┗ 📄 db.js                  # Database connection setup
 ┣ 📂 controllers
 ┃ ┣ 📄 authController.js       # Handles authentication & JWT
 ┃ ┣ 📄 eventController.js      # Event management
 ┃ ┣ 📄 qrController.js         # QR Code generation & validation
 ┃ ┣ 📄 ticketController.js     # Ticket management
 ┃ ┣ 📄 userController.js       # User profile & role management
 ┃ ┗ 📄 attendanceController.js # Attendance tracking
 ┣ 📂 middleware
 ┃ ┣ 📄 authMiddleware.js       # JWT validation & role-based access
 ┃ ┣ 📄 roleMiddleware.js       # Role-based permissions
 ┃ ┗ 📄 errorHandler.js         # Centralized error handling
 ┣ 📂 models
 ┃ ┣ 📄 eventModel.js           # Event schema
 ┃ ┣ 📄 qrModel.js              # QR Code schema
 ┃ ┣ 📄 ticketModel.js          # Ticket schema
 ┃ ┣ 📄 userModel.js            # User schema
 ┃ ┗ 📄 attendanceModel.js      # Attendance schema
 ┣ 📂 routes
 ┃ ┣ 📄 authRoutes.js           # Auth routes
 ┃ ┣ 📄 eventRoutes.js          # Event routes
 ┃ ┣ 📄 qrRoutes.js             # QR & attendance routes
 ┃ ┣ 📄 ticketRoutes.js         # Ticket routes
 ┃ ┣ 📄 userRoutes.js           # User routes
 ┃ ┗ 📄 attendanceRoutes.js     # Attendance routes
 ┣ 📂 utils
 ┃ ┣ 📄 emailService.js         # Email verification & reset
 ┃ ┣ 📄 jwtUtils.js             # JWT token utilities
 ┃ ┣ 📄 hashUtils.js            # Password hashing
 ┃ ┗ 📄 qrUtils.js              # QR code generation helpers
 ┣ 📄 .env                      # Environment variables
 ┣ 📄 package.json              # Dependencies & scripts
 ┣ 📄 index.js                  # Main server file
 ┗ 📄 README.md                 # Project documentation
```

---
## 📌 API Endpoints
### 🛠 Authentication
| Method | Route            | Description       |
|--------|-----------------|-------------------|
| POST   | /api/auth/register | Register user   |
| POST   | /api/auth/login    | Login user      |
| GET    | /api/auth/verify/:token | Email verification |
| POST   | /api/auth/reset-password | Request password reset |

### 📆 Events
| Method | Route          | Description |
|--------|--------------|-------------|
| POST   | /api/events/create | Create event |
| GET    | /api/events/ | Get all events |

### 🎫 Tickets
| Method | Route            | Description |
|--------|-----------------|-------------|
| POST   | /api/tickets/generate | Generate ticket |

### 📲 QR Code & Attendance
| Method | Route          | Description |
|--------|--------------|-------------|
| POST   | /api/qr/generate | Generate QR Code |
| POST   | /api/qr/scan | Scan QR & Mark Attendance |

---
## 🔥 Technologies Used
✔ **Node.js** & **Express.js**  
✔ **MongoDB** with **Mongoose** ORM  
✔ **JWT Authentication**  
✔ **Bcrypt for Password Hashing**  
✔ **QR Code Generation (qrcode package)**  
✔ **Nodemailer for Emails**  
✔ **Role-Based Access Control (RBAC)**  
✔ **Multer (for file handling, if needed)**  

---
## 🛡 Security Measures
🔹 **JWT Authentication** - Ensures secure access  
🔹 **Password Hashing** - Protects stored passwords  
🔹 **Role-Based Access Control** - Restricts unauthorized access  
🔹 **Preventing QR Code Reuse** - Stops multiple scans  

---
## 🤝 Contributing
1. Fork the repo
2. Create a new branch (`feature-branch`)
3. Commit changes & push
4. Create a Pull Request

---
## 📜 License
This project is **MIT Licensed**.

---


