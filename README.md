## Assignment 4 – Secure MVC Backend with RBAC
Project Overview

This project is a Node.js backend application built with Express and MongoDB, following the MVC (Model–View–Controller) architecture. It implements authentication, JWT authorization, and Role-Based Access Control (RBAC) with two related objects: Products and Reviews.

Technologies Used

Node.js

Express.js

MongoDB & Mongoose

JWT (JSON Web Tokens)

bcrypt

HTML & JavaScript (frontend testing)

## Project Structure

ASSIGNMENT3_BACKEND  
│
├── controllers  
│   ├── productController.js  
│   ├── reviewController.js  
│   └── userController.js  
│
├── middleware  
│   ├── authMiddleware.js  
│   └── errorHandler.js  
│
├── models  
│   ├── product.js  
│   ├── review.js  
│   └── user.js  
│
├── routes  
│   ├── productRoutes.js  
│   ├── reviewRoutes.js  
│   └── userRoutes.js  
│
├── public  
│   ├── index.html  
│   ├── script.js  
│   └── style.css  
│
├── .env  
├── server.js  
├── package.json  
└── README.md  

---

## Features

- MVC architecture
- MongoDB with Mongoose
- User registration and login
- Password hashing
- JWT authentication
- CRUD operations for:
  - Users
  - Products
  - Reviews
- Update (PUT) and Delete (DELETE) via API
- Centralized error handling middleware

---

## Authentication

- Authentication is handled using **JSON Web Tokens (JWT)**
- After login or registration, a token is returned
- Token must be sent in request headers:

  Objects
Primary Object

Product: name, price, category

Secondary Object

Review: productId, text, rating

Each object supports full CRUD operations.

Authentication & Security

Users can register and login

Passwords are hashed using bcrypt

Authentication is handled using JWT

Tokens are required for protected routes

Role-Based Access Control (RBAC)

Public Access:

GET products

GET reviews

Admin Only Access:

POST / PUT / DELETE products

POST / PUT / DELETE reviews

API Features

User registration & login

JWT-protected routes

Admin-only access for modifying data

CRUD operations for Products and Reviews

How to Run

Install dependencies

npm install


Start MongoDB

Run the server

node server.js


Open the frontend in the browser

Testing

Tested using Postman

Includes successful and failed requests for:

User vs Admin roles

Authorized vs Unauthorized access

Conclusion

This project demonstrates a secure, scalable backend system using industry best practices, including MVC architecture, JWT authentication, password hashing, and role-based authorization.



