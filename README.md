🚀 Angular Full-Stack Todo Application
- Responsive • JWT-Ready • Cloud-Deployed • Dual-Mode Environment
- Live Production URL: https://angular-todo-mongodb-frontend.vercel.app/login
- Backend API URL: https://angular-todo-mongodb-backend-production.up.railway.app/
- A production-oriented full-stack Todo application built with Angular and Node.js, designed with mobile-first responsive principles and deployed to the cloud with CI/CD - - automation.
- This project demonstrates frontend engineering discipline, backend API integration, environment-based configuration, and real production deployment practices.
## 📌 1. Project Overview
- This application provides a complete Todo management system featuring:
• Task creation, editing, deletion
• Completion / undo functionality
• Sorting & filtering logic
• Responsive UI (mobile → desktop)
• Cloud deployment with 24/7 availability
• Environment-based local + production modes
- The system is architected to simulate a real production web application rather than a simple frontend demo.
## 🧩 2. Architecture Overview
- High-Level Flow
- [ Browser ] ↓ [ Angular Frontend ] ↓ [ REST API - Node/Express ] ↓ [ Cloud Database ] 
- [ Browser ]
-       ↓
- [ Angular Frontend (Vercel) ]
-       ↓
- [ Node.js REST API (Cloud) ]
-       ↓
- [ Managed Cloud Database ]

## Frontend Architecture (Angular)
• Component-based UI structure
• Service layer for API communication
• Environment configuration (environment.ts)
• Clean separation of presentation and data logic
• Mobile-first CSS layout strategy
- Key folders:
- src/
- ├── app/
- │   ├── components/
- │   ├── services/
- │   └── models/
- ├── environments/

## Backend Architecture (Node.js + Express)
• RESTful API endpoints
• Middleware configuration (CORS, JSON parsing)
• Modular route/controller structure
• Environment-based configuration
• Cloud deployment ready

## 🔄 3. Dual-Mode Environment Configuration
- This application supports two operational modes:
🟢 Development Mode (Fully Local Stack)
• Angular runs via ng serve
