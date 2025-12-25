# 📚 Islamic Online Library - Enterprise Grade E-commerce Platform

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-emerald.svg)](https://www.mongodb.com/mern-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Security: Enterprise](https://img.shields.io/badge/Security-Enterprise--Grade-gold.svg)](#security--architecture)

A high-performance, premium, and feature-rich e-commerce platform tailored for Islamic literature. Inspired by the elegance of **Wafilife** and the robustness of modern enterprise applications, this platform provides a seamless shopping experience for knowledge seekers.

![Home Page Preview](file:///C:/Users/Admin/.gemini/antigravity/brain/5eb1b659-f8cf-41f6-bdc2-b6ed9a9d2712/home_page_1766651993114.png)

---

## ✨ Key Features

### 🛒 Advanced Commerce System
- **Intelligent Filtering**: Filter books by Author, Publisher, Category, Binding, and Price Range with URL synchronization.
- **Dynamic Bookshelf**: A premium grid view with hover effects and detailed book metadata (ISBN, Pages, Publication Year).
- **"Look Inside" Preview**: Integrated PDF previewer for users to read sample pages before purchasing.

### 💳 Localized Payment Gateways
- **SSLCommerz Integration**: Secure and seamless bank/card payments.
- **bKash Integration**: Instant mobile money transactions for the Bangladeshi market.

### 🛡️ Security & Architecture
- **Enterprise Polish**: Centralized error handling and async lifecycle management.
- **Hardened Security**: Protected with `Helmet.js`, CORS policies, and `Express Rate Limiting` to prevent brute-force attacks.
- **JWT Authentication**: Secure user sessions and role-based access control (User/Admin).

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern, translucent UI elements with smooth transitions.
- **Developer Showcase**: A professional, personalized [Contact Page](file:///C:/Users/Admin/.gemini/antigravity/brain/5eb1b659-f8cf-41f6-bdc2-b6ed9a9d2712/uploaded_image_1766652547836.png) built with an emerald & slate aesthetic.

---

## 🚀 Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast development and optimized production builds.
- **Tailwind CSS**: Utility-first CSS for highly customized and responsive designs.
- **Redux Toolkit**: Efficient state management for cart, users, and product data.
- **Lucide React**: Beautiful, consistent iconography.

### Backend
- **Node.js & Express**: Scalable server-side logic with ES Modules.
- **MongoDB & Mongoose**: Flexible NoSQL database with strict schema validation.
- **Security Suite**: `Helmet`, `Express-Rate-Limit`, `BcryptJS`, `JWT`.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- SSLCommerz Sandbox credentials

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abdulmazid24/islamic-online-library.git
   cd islamic-online-library
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   # Create a .env file based on PRODUCTION_SETUP.md (check /docs)
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 📄 Documentation (Developer Only)
Detailed developer guides are located in the `docs/` folder (private/ignored by Git):
- `API_SPECIFICATION.md`: Comprehensive endpoint guide.
- `ENTERPRISE_ARCHITECTURE.md`: Deep dive into security and design.
- `PRODUCTION_SETUP.md`: Deployment checklist.

---

## 👨‍💻 Author
**Abdul Mazid**
*Full-Stack MERN Developer*
- [Portfolio](https://abdulmazid-portfolio.vercel.app/)
- [Facebook](https://www.facebook.com/Abdulmazid240)
- [LinkedIn](https://www.linkedin.com/in/abdulmazid24)

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
