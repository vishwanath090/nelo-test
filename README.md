# NELO Task Manager – React.js Assessment

A modern Task Manager application developed as part of the NELO React.js/Node.js Assessment. This project demonstrates React fundamentals, state management with hooks, reusable components, Tailwind CSS UI, session handling, debounced search, and simulated background automation.

## 📋 Project Overview

This application provides comprehensive task management functionality:

- **User Authentication** - Simple login with email and password
- **Task Dashboard** - Centralized view of all tasks with filtering and search
- **CRUD Operations** - Full Create, Read, Update, Delete functionality for tasks
- **Advanced Search** - Debounced search with Elastic-style matching
- **Smart Filtering** - Filter by status and priority levels
- **Session Management** - Persistent login using sessionStorage
- **Automated Notifications** - Simulated cron job for overdue task alerts
- **Modern UI** - Tailwind CSS with glass morphism design

## ✨ Features Implemented

### ✅ CRUD Operations
- **Create Tasks** with:
  - Title (required)
  - Description (required)
  - Priority (Low, Medium, High)
  - Due Date (required)
- **Read/Display Tasks** with:
  - Title and description
  - Priority badge with color coding
  - Due date with overdue indicators
  - Status (Completed/Pending)
- **Update Tasks** via modal interface
- **Delete Tasks** with confirmation dialog
- **Toggle Completion** status between complete and pending

### 🔍 Filtering & Search
- **Task Filters**:
  - All tasks
  - Completed tasks only
  - Pending tasks only
  - High/Medium/Low priority
- **Search Functionality**:
  - Debounced input (300ms delay)
  - Case-insensitive matching
  - Partial substring matching across title, description, and priority
  - Real-time results rendering

### 🔐 Login & Session Handling
- Simple login form with email and password
- Session persistence using sessionStorage
- Automatic redirect to dashboard after successful login
- Logout functionality that clears session
- Session persists until browser tab closure

### ⚡ Debouncing Implementation
- Custom `useDebounce` hook
- 300ms delay to prevent excessive re-renders
- Optimized search performance
- Smooth user typing experience

### 🔎 Elastic Search Flow
The search follows the exact required workflow:
User Input → Debounce (300ms) → Filter Local Data → Render Results

text
- Input is debounced to reduce unnecessary filtering
- Case-insensitive partial substring matching
- Instant results rendering after debounce period

### ⏰ Simulated Cron Job
- Background task check every 20 minutes
- Identifies pending tasks that are overdue
- Logs mock email notifications to console
- Runs immediately on component mount for demonstration
- Clean interval management to prevent memory leaks

## 🛠 Tech Stack

- **Frontend Framework**: React.js 18.2.0
- **Build Tool**: Vite 4.3.0
- **Styling**: Tailwind CSS 3.3.0
- **State Management**: React Hooks (useState, useEffect)
- **Session Storage**: Browser sessionStorage API
- **Development**: Hot Module Replacement (HMR)

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

