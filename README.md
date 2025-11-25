NELO Task Manager – React.js Assessment

A Task Manager application developed as part of the NELO React.js/Node.js Assessment.
This project demonstrates React fundamentals, state management with hooks, reusable components, Tailwind UI, session handling, debounced search, and simulated background automation.

Project Overview

This application provides the following functionality:

Login with email and password

Dashboard displaying all tasks

Create, read, update, and delete tasks

Search tasks with debouncing

Filter tasks by status and priority

Session management using sessionStorage

Simulated cron job that runs every 20 minutes

Tailwind-based user interface

The implementation follows all NELO assessment requirements.

Features Implemented
1. CRUD Operations

Create tasks with:

Title

Description

Priority

Due Date

Required field validation

Task list display with:

Title

Description

Priority badge

Due Date

Status indicator

Edit tasks using a modal

Delete tasks with confirmation

Mark tasks as completed or pending

2. Filtering and Search

Task filters:

All

Completed

Pending

High / Medium / Low Priority

Search functionality:

Debounced search input

Case-insensitive

Partial substring matching (Elastic-style search)

3. Login and Session Handling

Simple login page with email and password

Session stored in sessionStorage

Automatic redirect to dashboard after login

Logout clears session and redirects to login page

4. Debouncing

Implemented using a custom useDebounce hook

Prevents excessive re-renders during search

Ensures smooth user experience

5. Elastic Search Flow

The search process follows the exact required flow:

User types input

Input is debounced

Debounced input filters local tasks

Matching is case-insensitive

Results render instantly

6. Simulated Cron Job

A background check runs every 20 minutes:

Identifies pending tasks

Logs a "mock email notification" message

Runs immediately on component mount (for demo)

Tech Stack

React.js

Vite

React Router v6

Tailwind CSS

JavaScript (ES6+)

sessionStorage

Custom hooks

Installation and Setup

Clone the repository:

git clone https://github.com/vishwanath090/nelo-test.git
cd nelo-test


Install dependencies:

npm install


Start development server:

npm run dev


Application will be available at:

http://localhost:5173

Project Structure
src/
 ├── components/
 │      EditTaskModal.jsx
 │      FilterBar.jsx
 │      SearchInput.jsx
 │      TaskCard.jsx
 │      TaskForm.jsx
 ├── hooks/
 │      useDebounce.js
 ├── pages/
 │      Dashboard.jsx
 │      LoginPage.jsx
 ├── utils/
 │      matcher.js
 │      session.js
 ├── styles/
 │      globals.css
 ├── App.jsx
 └── main.jsx

Assessment Checklist

All NELO requirements have been met:

CRUD operations

Task filtering

Debounced search

Elastic matching

Session-based login

Dashboard redirection

Cron simulation

Tailwind-based UI

Reusable components

Clean code and naming

Author

Vishwanath Biradar
GitHub: https://github.com/vishwanath090
