import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, clearMessages } from '../store/employeeSlice';
import { fetchCountries } from '../store/countrySlice';

export const useEmployeeData = () => {
  const dispatch = useDispatch();

  const {
    employees,
    searchedEmployee,
    searchError,
    isSearching,
    loading,
    error,
    successMessage
  } = useSelector((state) => state.employee);

  const { countries } = useSelector((state) => state.country);

  useEffect(() => {
    if (employees.length === 0 && !loading) {
      dispatch(fetchEmployees());
    }
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, employees.length, countries.length, loading]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  return {
    employees,
    searchedEmployee,
    searchError,
    isSearching,
    loading,
    error,
    successMessage,
    countries
  };
};
