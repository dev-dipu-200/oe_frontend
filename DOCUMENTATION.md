# Employee Onboarding & Exit (OE) Application Documentation

## Project Overview
The **Employee Onboarding & Exit (OE) Application** is a centralized platform designed to streamline and manage the lifecycle of employees from joining (onboarding) to departure (exit/offboarding). It provides HR and management with a clear overview of tasks, phases, and status for each employee process.

## Tech Stack
- **Framework:** [Nuxt.js 4](https://nuxt.com/) (Vue 3 based)
- **State Management:** [Pinia](https://pinia.vuejs.org/) with persistence support
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Core Features

### 1. Dashboard
- **KPI Cards:** Real-time metrics for Active Onboarding, Active Exits, Pending Tasks, and Monthly Completions.
- **Active Onboarding List:** Quick view of employees currently in the onboarding process.
- **Active Exits List:** Quick view of employees currently in the offboarding process.
- **Pending Tasks:** Prioritized task list with due dates and assignments.

### 2. Onboarding Management
Tracks employee onboarding across four distinct phases:
- **Phase 1: Pre-Onboarding:** Activities from offer acceptance to 2 days before joining (e.g., system records, internal notifications).
- **Phase 2: Day 1 – Onboarding Day:** Documentation, IT setup, and welcome activities.
- **Phase 3: Knowledge Transfer:** Project handover and team introduction.
- **Phase 4: 15-Day Follow-up:** Feedback and integration checks.

Features include:
- Search and filter employees.
- Visual progress tracking per phase.
- Detailed task status (Done, In Progress, Pending).
- Assignment tracking (HR, IT, Managers, etc.).

### 3. Exit Management
(In development) Manages the offboarding workflow, including knowledge transfer, asset recovery, and final clearance.

### 4. Task Management
A centralized view for tracking all pending activities across different departments and roles.

### 5. Global Loader
A beautiful, full-screen loading overlay with backdrop blur and an animated spinner.
- **Store:** `src/stores/loader.ts`
- **Component:** `src/components/Loader.vue`
- **Usage:**
  ```javascript
  const loader = useLoaderStore()
  loader.show('Optional message')
  loader.hide()
  ```

### 6. Global Toast Notifications
A responsive notification system for feedback on API errors, warnings, and success messages, powered by `vue3-toastify`.
- **Store:** `src/stores/toast.ts` (Abstraction layer)
- **Plugin:** `src/plugins/toastify.ts`
- **Usage:**
  ```javascript
  const toast = useToastStore()
  toast.success('Operation successful')
  toast.error('Something went wrong')
  toast.warning('Check your input')
  toast.info('Information message')
  ```

## Project Structure

```text
/
├── .env.[dev|prod|stage]   # Environment-specific configurations
├── nuxt.config.ts           # Nuxt configuration and module registration
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS customization (includes 'oe-' prefix)
└── src/                     # Source directory
    ├── app/
    │   └── app.vue          # Root component
    ├── components/          # Reusable UI components (Sidebar, Topbar, etc.)
    ├── layouts/
    │   └── default.vue      # Main application layout with navigation
    ├── pages/               # Routing and page-level components
    │   ├── index.vue        # Dashboard
    │   ├── onboarding/      # Onboarding workflow pages
    │   ├── exit/            # Exit workflow pages
    │   └── tasks/           # Task management pages
    ├── plugins/             # Nuxt plugins (e.g., pinia-persist)
    └── stores/              # Pinia state management stores
        ├── auth.ts          # Authentication and user profile
        └── counter.ts       # Example/Utility store
```

## State Management

### Auth Store (`src/stores/auth.ts`)
Manages the current logged-in user's information, including:
- **Name:** User's display name.
- **Email:** User's email address.
- **Role:** User's permissions (e.g., Admin, HR).
- **Persistence:** Enabled via `pinia-plugin-persistedstate`.

## Development Conventions
- **Styling:** Tailwind CSS is used with a custom `oe-` prefix for project-specific utility classes to avoid collisions (e.g., `oe-bg-blue-600`, `oe-p-6`).
- **Icons:** Currently uses emoji-based icons for a lightweight and clean aesthetic.

## Setup and Installation

### Prerequisites
- Node.js (Latest LTS recommended)
- pnpm

### Installation
```bash
pnpm install
```

### Running Development Server
```bash
pnpm dev
```

### Building for Production
```bash
pnpm build
```
