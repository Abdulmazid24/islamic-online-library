# 📚 Islamic Online Library - Enterprise Grade E-commerce Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-emerald?style=for-the-badge&logo=vercel)](https://quiet-cendol-ba4232.netlify.app/)
[![Backend API](https://img.shields.io/badge/API-Live-blue?style=for-the-badge&logo=vercel)](https://islamic-online-library.vercel.app/)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-emerald.svg?style=flat-square)](https://www.mongodb.com/mern-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> A high-performance, premium, and feature-rich e-commerce platform tailored for Islamic literature. Built with enterprise-grade architecture, modern UI/UX, and production-ready deployment.

## 🌐 Live Deployment

- **Frontend**: [https://quiet-cendol-ba4232.netlify.app/](https://quiet-cendol-ba4232.netlify.app/)
- **Backend API**: [https://islamic-online-library.vercel.app/](https://islamic-online-library.vercel.app/)
- **API Documentation**: [Swagger UI](https://islamic-online-library.vercel.app/api-docs/)

---

## ✨ Key Features

### 🛒 Advanced Commerce System
- **Intelligent Filtering**: Filter books by Author, Publisher, Category, Binding, and Price Range with URL synchronization
- **Dynamic Bookshelf**: Premium grid view with hover effects and detailed book metadata (ISBN, Pages, Publication Year)
- **"Look Inside" Preview**: Integrated PDF previewer for users to read sample pages before purchasing
- **110+ Realistic Book Dataset**: Demonstrates scalability and performance with a large, production-ready collection

### 💳 Localized Payment Gateways
- **SSLCommerz Integration**: Secure and seamless bank/card payments
- **bKash Integration**: Instant mobile money transactions for the Bangladeshi market

### 🛡️ Security & Architecture
- **Enterprise Polish**: Centralized error handling and async lifecycle management
- **Hardened Security**: Protected with `Helmet.js`, CORS policies, and `Express Rate Limiting` to prevent brute-force attacks
- **JWT Authentication**: Secure user sessions and role-based access control (User/Admin)
- **Production-Ready**: PM2 ecosystem configuration for zero-downtime deployments

### 📚 Developer Experience
- **Interactive API Documentation**: Swagger UI for real-time API testing
- **Automated Testing**: Jest & Supertest for backend reliability
- **Defensive UI**: Optional chaining and null checks prevent crashes during data loading

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern, translucent UI elements with smooth transitions
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Professional Branding**: Custom favicon and SEO-optimized metadata

---

## 🚀 Tech Stack

### Frontend
- **React (Vite)**: Lightning-fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS for highly customized and responsive designs
- **Redux Toolkit**: Efficient state management for cart, users, and product data
- **Lucide React**: Beautiful, consistent iconography

### Backend
- **Node.js & Express**: Scalable server-side logic with ES Modules
- **MongoDB & Mongoose**: Flexible NoSQL database with strict schema validation
- **Security Suite**: `Helmet`, `Express-Rate-Limit`, `BcryptJS`, `JWT`
- **Swagger**: Interactive API documentation

### DevOps & Deployment
- **Frontend**: Netlify (Automated deployments from GitHub)
- **Backend**: Vercel (Serverless functions)
- **Database**: MongoDB Atlas (Cloud-hosted)
- **Process Manager**: PM2 for production environments

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- SSLCommerz Sandbox credentials (optional for payment testing)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abdulmazid24/islamic-online-library.git
   cd islamic-online-library
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   
   # Create .env file with:
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # NODE_ENV=development
   
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Seed Database** (Optional):
   ```bash
   cd server
   npm run seed
   ```

---

## 📊 Project Structure

```
islamic-online-library/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-based pages
│   │   ├── redux/         # State management
│   │   └── constants.js   # API endpoints
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── controllers/       # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & error handling
│   ├── config/           # Database & Swagger config
│   ├── data/             # Seed data (110+ books)
│   └── tests/            # Jest test suites
└── docs/                 # Private documentation
```

---

## 🎯 Key Highlights for Recruiters

### Enterprise-Grade Features
✅ **Scalability**: Handles 110+ items with efficient pagination and filtering  
✅ **Security**: Rate limiting, Helmet.js, JWT authentication  
✅ **Testing**: Automated test suite with Jest & Supertest  
✅ **Documentation**: Interactive Swagger API docs  
✅ **Deployment**: Production-ready with Vercel + Netlify + MongoDB Atlas  
✅ **Code Quality**: Defensive programming, centralized error handling  

### Professional Polish
✅ Custom favicon and SEO metadata  
✅ Premium UI with glassmorphism and micro-animations  
✅ Image fallback system for missing assets  
✅ PM2 ecosystem configuration for production  

---

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page+Preview)

### API Documentation
![Swagger UI](https://via.placeholder.com/800x400?text=Swagger+API+Documentation)

---

## 🧪 Testing

Run the test suite:
```bash
cd server
npm test
```

---

## 📄 API Documentation

Interactive API documentation is available at:
- **Local**: http://localhost:5000/api-docs
- **Production**: https://islamic-online-library.vercel.app/api-docs/

---

## 👨‍💻 Author

**Abdul Mazid**  
*Full-Stack MERN Developer*

- 🌐 [Portfolio](https://abdulmazid-portfolio.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/abdulmazid24)
- 📘 [Facebook](https://www.facebook.com/Abdulmazid240)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the elegance of **Wafilife**
- Built with modern best practices and enterprise standards
- Designed for the Bangladeshi Islamic literature market

---

**⭐ If you find this project impressive, please consider giving it a star!**
