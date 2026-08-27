# Employee Management Application (React + Redux Toolkit)

A modern, responsive, full-featured Employee Management Web Application built using **React**, **Redux Toolkit**, and modern CSS glassmorphism styling.

---

## Features
- **Employee Table / Directory**: View employees with Name, Email, Mobile, Country, State, and District.
- **Search by Employee Name or ID**: Live search filtering by Employee Name or ID with immediate visual feedback and empty search state notifications ("No employee found matching query").
- **Full CRUD Operations**:
  - **Create**: Add new employees with complete form validations.
  - **Read**: Fetch list of employees and view details.
  - **Update**: Edit existing employee records with pre-populated form fields.
  - **Delete**: Remove employees with a confirmation modal popup.
- **Form & Validations**:
  - Validates required fields (`Name`, `Email`, `Mobile`, `Country`, `State`, `District`).
  - Strict Email format validation using regular expressions.
  - Mobile number length & character validation (7-15 digits).
  - Field length checks (e.g. Name min 2, max 50 chars).
  - Robust country list fallback mechanism to ensure dropdown items load reliably.
- **API Integration & Fallback Handling**:
  - Integrated with mock APIs:
    - `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country`
    - `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`
  - Cross-browser timeout handling using standard `AbortController`.
  - Includes offline / timeout fallback mock data to ensure application reliability during API outages or rate limits.
- **State Management & Architecture**:
  - Global application state managed via **Redux Toolkit** (`createSlice`, `createAsyncThunk`).
  - **Smart Component**: `EmployeeManagement.jsx` (handles state, thunk dispatching, modal visibility).
  - **Dumb Components**: `EmployeeTable.jsx`, `EmployeeForm.jsx`, `SearchBar.jsx`, `ConfirmModal.jsx`, `UIStates.jsx` (presentation & user interactions).

---

## Tech Stack
- **Frontend**: React 19, Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest

---

## Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd "c:/Multigenesys TASK"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Running Unit Tests
Run the Vitest unit test suite covering Redux thunks, reducers, and form validation logic:
```bash
npm test
```

---

## Project Structure
```
c:/Multigenesys TASK/
├── src/
│   ├── api/
│   │   └── employeeService.js       # API calls, normalization & fallback data handling
│   ├── store/
│   │   ├── index.js                  # Redux Store Configuration
│   │   ├── employeeSlice.js          # Employee state & Async Thunks (Name/ID search)
│   │   └── countrySlice.js           # Country state & Async Thunks
│   ├── components/
│   │   ├── dumb/
│   │   │   ├── EmployeeTable.jsx     # Table view component
│   │   │   ├── EmployeeForm.jsx      # Form component with validation & country dropdown
│   │   │   ├── SearchBar.jsx         # Search input component (Name or ID)
│   │   │   ├── ConfirmModal.jsx      # Confirmation modal
│   │   │   └── UIStates.jsx          # Loading, Error, Empty states
│   │   └── EmployeeManagement.jsx    # Smart container component
│   ├── tests/
│   │   └── logic.test.js             # Unit tests for reducers & validation
│   ├── App.jsx                       # Root component with Redux Provider
│   └── index.css                     # Global design system & glassmorphism CSS
├── vitest.config.js                  # Vitest configuration
├── package.json
└── README.md
```

---

## API Endpoints Used
- `GET /country` - Fetch country list
- `GET /employee` - Fetch all employee records
- `GET /employee/:id` - Fetch single employee by ID
- `POST /employee` - Create employee record
- `PUT /employee/:id` - Update employee record
- `DELETE /employee/:id` - Delete employee record
