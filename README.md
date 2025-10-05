# 🧃 Custom Package Project

A full-stack web application that allows users to **create their own personalized care packages** by selecting products and quantities based on their needs and preferences.

Built with a **Next.js + NestJS** stack, this project demonstrates clean architecture, reusable components, and a strong focus on user experience.

---

## 🚀 Tech Stack

### **Frontend**
- [Next.js 18 (App Router)](https://nextjs.org/docs/app)
- TypeScript
- React Hooks & Context API (for global state management)
- TailwindCSS
- Vercel (for deployment)

### **Backend**
- [NestJS](https://nestjs.com/)
- TypeORM
- PostgreSQL
- Nodemailer (for email verification)
- RESTful API design principles

---

## 💡 Features

- 🧑‍💻 **User Registration & Email Verification** — Users register with an email, receive a verification link, and activate their account.
- 📦 **Custom Package Builder** — Users can choose products and define quantities dynamically.
- 🧠 **Global State Management** — Implemented with React Context for seamless data sharing across components.
- 📤 **Real-time Updates** — Automatically updates selected items and total count.
- 💅 **Responsive Design** — Clean, minimal UI optimized for all devices.

---

## 🏗️ Project Structure

### **Frontend**



## 🖥️ Frontend Screenshots

### 1️⃣ Login & Registration

Users start at the **Login / Registration page**. Here they can:

- Enter their **username** and **email** to register.
- Upon registration, a verification email is sent automatically (via Nodemailer + SMTP).
- Users must **verify their email** by clicking the link before accessing the main app.
- Once verified, the user can log in and proceed to the Custom Package Builder.

![Login / Registration Page](readme-assets/login.png)

---

### 2️⃣ Custom Package Builder (Home Page)

After login and verification, users land on the **Custom Package Builder page**. Features include:

- Selecting products from different categories (e.g., Menstrual Products, Supportive Products).
- Adding desired quantities for each product dynamically.
- Real-time update of the selected items list and total count.
- A summary panel showing the current “My Custom Package” selections.
- Interactive UI elements (AccordionItems, selection highlights, etc.).
- Fully responsive layout, optimized for all devices.

![Home Page / Custom Package Builder](readme-assets/homepage.png)



🧪 Testing

Manual Testing:

Register a new user on the frontend and verify that the email is received.

Click the verification link and ensure the backend sets isVerified = true.

Log in and select products in the Custom Package Builder, confirm real-time updates.

Backend Testing (Optional):

Use tools like Postman or Insomnia to test API endpoints:

POST /user/register

GET /user/verify-email/:username/:verificationToken

GET /user/check-verification?username=<username>

Frontend Testing (Optional):

Test React components individually.

Confirm Context API state updates correctly across multiple components.

⚙️ Project Modules & Architecture
Backend (NestJS)

UserController: Handles registration, email verification, and user verification checks.

UserService: Contains business logic for creating users, sending verification emails, and updating verification status.

MailService: Sends emails using Nodemailer with Gmail SMTP.

User Entity: Represents the database table for users with fields: username, email, verificationToken, isVerified.

Database: PostgreSQL, managed via TypeORM.

Frontend (Next.js + React)

Pages / App Router:

page.tsx in /app: Home page wrapper that checks verification status.

Register/page.tsx: User registration page.

home/page.tsx: Custom Package Builder page.

Components:

AccordionItem.tsx, PackageOption.tsx, PackageSummary.tsx

Context / Store:

PackageContext.tsx: Global state management for selected products.

Styles: TailwindCSS for responsive design.