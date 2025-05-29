# 🧩 Angular In-Work Technical Assessment

**Live Demo:** [https://crud-angular-signal.netlify.app/login](https://crud-angular-signal.netlify.app/login)

---

## 📌 Overview

This project is a technical assessment built using **Angular v19+**, showcasing scalable architecture, reusable headless components, and modern UI practices. It integrates **Bootstrap** and **PrimeNG**, and emphasizes modularity, maintainability, and real-world development workflows.

---

## 🚀 Features

- ✅ **Angular v19+** using standalone components  
- ✅ **SCSS architecture** with variables, mixins, and modular styles  
- ✅ **Bootstrap 5** integration with custom overrides  
- ✅ **PrimeNG Table** with:
  - Sorting, filtering, global search, and export  
- ✅ **Routing Layouts**:
  - Auth Layout for login/register  
  - System Layout for authenticated pages with Sidebar, Navbar, and Footer  
- ✅ **Reusable Headless UI Components**:
  - `InputFieldComponent`  
  - `InputUploadComponent`  
  - `CardComponent`  
  - `ButtonComponent`  
- ✅ Lazy loading implemented for feature modules
- ✅ Not Found (404) page implemented for unmatched routes
---

## 🛒 Product Module (CRUD)

- 🔹 View product list  
- 🔹 View product details  
- 🔹 Add / Edit products  
- 🔹 Delete products  
- 🔹 Each product is tied to the currently authenticated user  

---

## 🔐 Auth Module

- Implemented a simple authentication system using **LocalStorage**  
- Users can **register** and **log in**  
- Each user can manage **only their own products**  
- Authentication state is managed using **Angular Signals**  
- UI updates reactively based on login state  
- Upon login, the app filters products according to the logged-in user  

---

## 🔔 Notifications

- Integrated **PrimeNG Toast** for user feedback:
  - Successful login & registration  
  - Product creation, update, and deletion  
  - Form validation and error handling  
- This improves UX by confirming actions and guiding the user

---

## ✨ Animations

- Added a simple animation to the **logo** using **Angular Animations**  
- Demonstrates working knowledge of Angular’s animation module and enhances user engagement

---

## 🧩 Architecture & Best Practices

- Lazy-loaded Standalone Component for improved performance and scalability
- RxJS & reactive patterns  
- Http Interceptors  
- Angular Services for Dummy Data
- Structural & attribute directives  
- Custom and built-in Pipes  
- Angular decorators: `@Input`, `@Output`, `@ContentChild`, `@ViewChild`, `@HostListener`, etc.  
- `ChangeDetectionStrategy.OnPush`  
- Modular folder structure  
- Git version control 
- 404 Not Found page to handle invalid routes gracefully
---

## 📁 Folder Structure

```
src/
├── Core/         # Interceptors, Guards, Constants, Configs
├── Shared/       # Shared UI components, Pipes, Directives
├── Feature/      # Feature modules (Product, Auth, etc.)
├── System/       # Layouts and internal pages
├── assets/
│   └── scss/
│       ├── _variables.scss
│       ├── _mixins.scss
│       └── components/
```

---

## ⚙️ Installation & Run

```bash
npm install
ng serve
```

---

## 🧰 Tech Stack

- Angular v19+  
- SCSS  
- Bootstrap 5  
- PrimeNG  
- RxJS  
- LocalStorage (for auth & products)  

---
