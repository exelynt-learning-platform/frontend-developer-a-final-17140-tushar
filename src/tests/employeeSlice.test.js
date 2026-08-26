import { describe, it, expect } from 'vitest';
import employeeReducer, {
  clearSearch,
  clearMessages,
  fetchEmployees
} from '../store/employeeSlice';

describe('employeeSlice Reducer & Actions', () => {
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
      searchedEmployee: { id: '123', name: 'Test' },
      isSearching: false,
      searchError: 'Error'
    };
    const nextState = employeeReducer(prevState, clearSearch());
    expect(nextState.searchQuery).toBe('');
    expect(nextState.searchedEmployee).toBeNull();
    expect(nextState.searchError).toBeNull();
  });

  it('should clear error and success messages', () => {
    const prevState = {
      ...initialState,
      error: 'Some error',
      successMessage: 'Success!'
    };
    const nextState = employeeReducer(prevState, clearMessages());
    expect(nextState.error).toBeNull();
    expect(nextState.successMessage).toBeNull();
  });

  it('should handle fetchEmployees.pending', () => {
    const action = { type: fetchEmployees.pending.type };
    const state = employeeReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchEmployees.fulfilled', () => {
    const mockData = [{ id: '1', name: 'Jane' }];
    const action = { type: fetchEmployees.fulfilled.type, payload: mockData };
    const state = employeeReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.employees).toEqual(mockData);
  });
});
