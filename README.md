# Money Transfer App – Angular v20

A responsive single‑page application for transferring money and viewing transaction history.  
Built with **Angular 20**, **standalone components**, **signals**, **reactive forms**, **Angular Material Dialog**, **SCSS with BEM**, and a **desktop‑first responsive** approach.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Key Decisions & Motivations](#key-decisions--motivations)
- [Project Structure](#project-structure)
- [Setup & Running](#setup--running)
- [Features Implemented](#features-implemented)
- [Future Work](#future-work)
- [Credits](#credits)

---

## 🧭 Overview

The application consists of two main parts:

1. **Transfer Money Form** – allows users to enter a recipient and amount, preview the transfer, and confirm. The balance updates immediately and a new transaction appears at the top of the list.
2. **Transactions List** (in progress) – displays recent transactions with live search and sort capabilities.

All components are **standalone**, use **signals** for reactive state, and follow a **clean, DRY, BEM‑based SCSS** methodology.

---

## 🛠 Technology Stack

| Tool / Library          | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| Angular v20             | Core framework, standalone components           |
| Angular Signals         | Reactive state management (no external lib)     |
| Angular Reactive Forms  | Form validation & control                       |
| Angular Material Dialog | Preview modal (lightweight, accessible)         |
| SCSS                    | Custom styling with BEM                         |
| Desktop‑first CSS       | Responsive design via `max-width` media queries |
| TypeScript              | Strict typing, interfaces                       |
| Google Fonts (Kanit)    | Clean, modern typography                        |

No CSS frameworks (Tailwind, Bootstrap) were used – all styles are handcrafted for maximum control and minimal bundle size.

---

## Key Decisions & Motivations

### 1. Standalone Components & Signals

- **Why?** Angular v20 promotes standalone as the default; signals provide fine‑grained reactivity without zone.js overhead.
- **Benefit:** Cleaner code, better performance, and future‑proof.

### 2. No UI Framework for Form Fields

- **Why?** After initial attempts with Angular Material `mat-form-field`, we found customisation too verbose (`::ng-deep`, appearance limitations).
- **Decision:** Replaced all Material form fields with plain HTML `<input>` + `<label>` + custom SCSS.
- **Result:** 100% control over every pixel, no style encapsulation fights, smaller bundle.

### 3. BEM + Desktop‑first SCSS

- **Why?** BEM provides a predictable, maintainable naming system. Desktop‑first (`max-width`) reduces code complexity – we start from the largest screen and scale down.
- **Benefit:** Readable stylesheets, easy to extend, no CSS leaks.

### 4. Angular Material Dialog (only for preview)

- **Why?** Building a fully accessible modal from scratch is time‑consuming and error‑prone. `MatDialog` is already in the project (via `ng add @angular/material`) and works perfectly.
- **Trade‑off:** Adds a small dependency, but the component is only used for this one feature.

### 5. Transfer Data Model (DRY)

- **Why?** `TransferTo` and `TransferData` interfaces are defined once in `models/transfer.ts` and imported wherever needed.
- **Benefit:** Single source of truth, easy to update, strong type safety.

### 6. No Global State Management

- **Why?** The app is simple – balance and transactions are managed in the root `App` component using signals and passed down via `input()`.
- **Benefit:** Keeps complexity low; follows Angular’s local reasoning principle.

## ⚙️ Setup & Running

```bash
# 1. Clone the repository
git clone <repo-url>
cd money-transfer-app

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve

# 4. Open the app
http://localhost:4200
```
