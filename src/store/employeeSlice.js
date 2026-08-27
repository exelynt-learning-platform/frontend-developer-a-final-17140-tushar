import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchEmployeesApi,
  fetchEmployeeByIdApi,
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi
} from '../api/employeeService';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEmployeesApi();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch employees');
    }
  }
);

export const searchEmployeeById = createAsyncThunk(
  'employee/searchEmployeeById',
  async (query, { getState, rejectWithValue }) => {
    if (!query || query.trim() === '') {
      return null;
    }
    const cleanQuery = query.trim().toLowerCase();
    const state = getState();

    // 1. Prioritize exact ID match first
    const exactIdMatch = state.employee.employees.find(
      (emp) => String(emp.id).toLowerCase() === cleanQuery
    );
    if (exactIdMatch) {
      return [exactIdMatch];
    }

    // 2. Fall back to name-based search
    const nameMatches = state.employee.employees.filter((emp) =>
      emp.name && emp.name.toLowerCase().includes(cleanQuery)
    );
    if (nameMatches.length > 0) {
      return nameMatches;
    }

    // 3. Attempt API lookup by ID if numeric
    try {
      const data = await fetchEmployeeByIdApi(query.trim());
      if (data) return [data];
    } catch (err) {
      // Fall through to error
    }

    return rejectWithValue(`No employee found matching "${query.trim()}".`);
  }
);

export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const newEmp = await createEmployeeApi(employeeData);
      return newEmp;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updated = await updateEmployeeApi(id, data);
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await deleteEmployeeApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete employee');
    }
  }
);

const initialState = {
  employees: [],
  searchedEmployee: null,
  searchQuery: '',
  isSearching: false,
  searchError: null,
  loading: false,
  error: null,
  successMessage: null
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchedEmployee = null;
      state.isSearching = false;
      state.searchError = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Search Employee by Name or ID
      .addCase(searchEmployeeById.pending, (state) => {
        state.isSearching = true;
        state.searchError = null;
        state.searchedEmployee = null;
      })
      .addCase(searchEmployeeById.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchedEmployee = action.payload;
        if ((!action.payload || action.payload.length === 0) && state.searchQuery) {
          state.searchError = `No employee found matching "${state.searchQuery}"`;
        }
      })
      .addCase(searchEmployeeById.rejected, (state, action) => {
        state.isSearching = false;
        state.searchedEmployee = null;
        state.searchError = action.payload;
      })
      // Add Employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.unshift(action.payload);
        state.successMessage = 'Employee added successfully!';
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex((e) => String(e.id) === String(action.payload.id));
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        // If search is active, re-run search query match logic against updated employee
        if (state.searchQuery) {
          const query = state.searchQuery.trim().toLowerCase();
          const exactIdMatch = state.employees.find(
            (emp) => String(emp.id).toLowerCase() === query
          );
          if (exactIdMatch) {
            state.searchedEmployee = [exactIdMatch];
            state.searchError = null;
          } else {
            const matches = state.employees.filter((emp) =>
              emp.name && emp.name.toLowerCase().includes(query)
            );
            state.searchedEmployee = matches.length > 0 ? matches : null;
            if (matches.length === 0) {
              state.searchError = `No employee found matching "${state.searchQuery}"`;
            }
          }
        } else if (Array.isArray(state.searchedEmployee)) {
          const sIndex = state.searchedEmployee.findIndex((e) => String(e.id) === String(action.payload.id));
          if (sIndex !== -1) {
            state.searchedEmployee[sIndex] = action.payload;
          }
        }
        state.successMessage = 'Employee updated successfully!';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((e) => String(e.id) !== String(action.payload));
        if (Array.isArray(state.searchedEmployee)) {
          state.searchedEmployee = state.searchedEmployee.filter((e) => String(e.id) !== String(action.payload));
          if (state.searchedEmployee.length === 0) {
            state.searchedEmployee = null;
          }
        }
        state.successMessage = 'Employee deleted successfully!';
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSearch, clearMessages } = employeeSlice.actions;
export default employeeSlice.reducer;
