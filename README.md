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
  - [Transfer Money](#transfer-money)
  - [Transaction History](#transaction-history)
- [Responsive Design](#responsive-design)

---

## 🧭 Overview

The application consists of two main parts:

1. **Transfer Money Form** – allows users to enter a recipient and amount, preview the transfer in a dialog, and confirm. The balance updates immediately and a new transaction appears at the top of the list.
2. **Transactions List** – displays recent transactions with **live search** (by merchant/beneficiary) and **sorting** (by date, beneficiary, amount). The sort order persists across all sorting options.

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
| CSS Grid / Flexbox      | Layout control                                  |
| TypeScript              | Strict typing, interfaces                       |
| Google Fonts (Kanit)    | Clean, modern typography                        |

No CSS frameworks (Tailwind, Bootstrap) were used – all styles are handcrafted for maximum control and minimal bundle size.

---

## Key Decisions & Motivations

### 1. Standalone Components & Signals

- **Why?** Angular v20 promotes standalone as the default; signals provide fine‑grained reactivity without zone.js overhead.
- **Benefit:** Cleaner code, better performance, and future‑proof.

### 2. No UI Framework for Form Fields

- **Why?** After initial attempts with Angular Material `mat-form-field`, customisation proved too verbose (`::ng-deep`, appearance limitations).
- **Decision:** Replaced all Material form fields with **plain HTML `<input>` + `<label>` + custom SCSS**.
- **Result:** 100% control over every pixel, no style encapsulation fights, smaller bundle.

### 3. BEM + Desktop‑first SCSS

- **Why?** BEM provides a predictable, maintainable naming system. Desktop‑first (`max-width`) reduces code complexity – we start from the largest screen and scale down.
- **Benefit:** Readable stylesheets, easy to extend, no CSS leaks.

### 4. DRY with Shared Styles

- **Why?** Both cards (Transfer Form and Transactions List) share identical header styles (teal background, icon, centered title).
- **Implementation:** Used **Sass placeholders** (`%card`, `%card-header`, `%card-icon`, `%card-title`) and **variables** defined in `src/styles.scss`, then `@extend`ed in each component.
- **Benefit:** Single source of truth – change one file, update both components.

### 5. Angular Material Dialog (only for Transaction preview)

- **Why?** Building a fully accessible modal from scratch is time‑consuming and error‑prone. `MatDialog` is already in the project (via `ng add @angular/material`) and works perfectly.
- **Trade‑off:** Adds a small dependency, but the component is only used for this one feature.

### 6. Persistent Sort Order

- **Why?** Requirement: _“The Sorting order (ascending/descending) should be persistent across all sorting options.”_
- **Implementation:** The current `sortOrder` signal is **not reset** when changing `sortBy` – only toggled when clicking the same field.
- **Benefit:** Consistent UX – users don’t lose their preferred direction when switching sort criteria.

### 7. No Global State Management

- **Why?** The app is simple – balance and transactions are managed in the root `App` component using signals and passed down via `input()`.
- **Benefit:** Keeps complexity low; follows Angular’s local reasoning principle.

---

## 8. Features Implemented

**Transfer Money**

- Pre‑filled, disabled **FROM ACCOUNT** with current balance.
- **TO ACCOUNT** and **AMOUNT** fields with reactive validation:
  - Required
  - Minimum: $0.01
  - Maximum: $500.00
- **Submit** button opens a **preview dialog** showing entered data.
- **Transfer** button inside dialog confirms – emits event, updates balance, resets form.
- Form reset after successful transfer.
- Fully responsive (mobile, tablet, desktop).

### Transaction History

- Displays mock transactions loaded from `src/app/mock/transactions.json`.
- **Live search** – filters by `merchant` or `beneficiary` on every keystroke.
- **Clear search** – × button appears when search term is non‑empty.
- **Sorting** by:
  - Date (newest/oldest)
  - Beneficiary (A–Z / Z–A)
  - Amount (ascending/descending)
- **Persistent sort order** – when switching between sort fields, the current direction (asc/desc) is preserved.
- **Table‑like layout** on desktop:
  - Colored left border (via `categoryCode`)
  - Short date (e.g., `Oct 19`)
  - Merchant logo (Base64)
  - Company name (bold) + payment method (gray) below
  - Amount signed (+/–) and colored (credit/debit), right‑aligned
- **Mobile‑optimised** – below 770px, layout switches to a clean stacked grid:
  - Top row: logo, date, amount (right‑aligned)
  - Bottom row: merchant + payment method (full width)
  - Empty state message when no transactions match the search.

### Production Readiness Assessment

The project is a solid foundation with clean code, modern Angular practices, and full feature implementation.
However, it is not yet production‑ready. The following areas require attention before deployment to real users.

### What’s Missing for Production Readiness

**Testing** No unit, integration, or E2E tests → regressions may go unnoticed.

- Unit tests (Jasmine/Karma) for components, services, sorting/filtering logic.
- Integration tests for user flows (transfer → transaction list).
- E2E tests (Cypress/Playwright) for critical journeys.

**Accessibility**

- Missing ARIA labels, focus management.
- Some colour contrasts may fail WCAG.
- Keyboard navigation untested.
- Add aria-label to icon buttons, aria-live for errors.
- Trap focus in modal, return focus after dialog close.
- Audit with axe DevTools; fix contrast ratios.

**Performance**

- No lazy loading – fine now, but doesn’t scale.
- Default change detection (ChangeDetectionStrategy.Default) causes unnecessary checks.
- Base64 logos bloat bundle; background image not optimised.
- Use ChangeDetectionStrategy.OnPush in all components.
- Optimise images (WebP, srcset).
- Add service worker (@angular/pwa) for offline capability.

**Error Handling**

- No global error handler → uncaught errors break silently.
- No loading/feedback states on form submission.
- No resilience for network failures.
- Implement ErrorHandler to log errors and show user‑friendly UI.
- Add loading spinner & disable button during submit.
- Use toast/snackbar for success/error feedback.

**Code Quality**

- Mock JSON imported as any – no type safety.
- Hardcoded strings (colours, asset paths) scattered.
- No enforced linting/formatting.
- Define TypeScript interface for mock data.
- Move hardcoded values to constants / environment files.
- Add ESLint, Prettier, Husky pre‑commit hooks.

**Environment**

- No environment configuration – balance, API endpoints hardcoded.
- Use Angular environments (environment.ts, environment.prod.ts).
- Differentiate dev/prod settings.

**Deployment**

- No CI/CD pipeline, no automated build/test/deploy.
- Set up GitHub Actions / GitLab CI.
- Deploy to static hosting (Netlify, Vercel).

**Documentation**

- Add JSDoc comments for public methods & computed signals.
- Create CONTRIBUTING.md.

## ⚙️ Setup & Running

```bash
# 1. Clone the repository
git clone <repo-url>
cd peachtree

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve

# 4. Open the app
http://localhost:4200
```
