import { describe, it, expect } from 'vitest';
import { validateEmployeeForm } from '../components/dumb/EmployeeForm';
import employeeReducer, { clearSearch, clearMessages } from '../store/employeeSlice';

describe('Employee Form Validation Logic', () => {
  it('validates empty inputs correctly', () => {
    const errors = validateEmployeeForm({
      name: '',
      email: '',
      mobile: '',
      country: '',
      state: '',
      district: ''
    });

    expect(errors.name).toBe('Full Name is required.');
    expect(errors.email).toBe('Email address is required.');
    expect(errors.mobile).toBe('Mobile number is required.');
    expect(errors.country).toBe('Country is required.');
    expect(errors.state).toBe('State is required.');
    expect(errors.district).toBe('District is required.');
  });

  it('validates invalid email and mobile formatting', () => {
    const errors = validateEmployeeForm({
      name: 'John',
      email: 'invalid-email',
      mobile: '123',
      country: 'India',
      state: 'Karnataka',
      district: 'Bengaluru'
    });

    expect(errors.email).toBe('Please enter a valid email address.');
    expect(errors.mobile).toBe('Enter a valid mobile number (7-15 digits).');
  });

  it('returns no errors for valid data', () => {
    const errors = validateEmployeeForm({
      name: 'Jane Doe',
      email: 'jane@example.com',
      mobile: '9876543210',
      country: 'United States',
      state: 'California',
      district: 'Los Angeles'
    });

    expect(Object.keys(errors).length).toBe(0);
  });
});

describe('Employee Reducer Logic', () => {
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

  it('should handle initial state', () => {
    expect(employeeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should clear search state', () => {
    const prevState = {
      ...initialState,
      searchQuery: '123',
      searchedEmployee: { id: '123', name: 'Test' }
    };
    const nextState = employeeReducer(prevState, clearSearch());
    expect(nextState.searchQuery).toBe('');
    expect(nextState.searchedEmployee).toBeNull();
  });

  it('should clear error and success messages', () => {
    const prevState = {
      ...initialState,
      error: 'Error',
      successMessage: 'Success!'
    };
    const nextState = employeeReducer(prevState, clearMessages());
    expect(nextState.error).toBeNull();
    expect(nextState.successMessage).toBeNull();
  });
});
