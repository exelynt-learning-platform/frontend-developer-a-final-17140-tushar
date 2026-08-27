import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEmployees,
  searchEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  clearSearch,
  clearMessages
} from '../store/employeeSlice';
import { fetchCountries } from '../store/countrySlice';
import { EmployeeTable } from './dumb/EmployeeTable';
import { EmployeeForm } from './dumb/EmployeeForm';
import { SearchBar } from './dumb/SearchBar';
import { ConfirmModal } from './dumb/ConfirmModal';
import { LoadingSpinner, ErrorAlert, SuccessAlert, EmptyState } from './dumb/UIStates';
import { Plus, Users, UserCheck, RefreshCw, XCircle } from 'lucide-react';

export const EmployeeManagement = () => {
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

  const [searchId, setSearchId] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  useEffect(() => {
    if (employees.length === 0 && !loading) {
      dispatch(fetchEmployees());
    }
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, employees.length, countries.length, loading]);

  // Clear success and error notifications automatically after 4 seconds
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleSearch = (id) => {
    dispatch(searchEmployeeById(id));
  };

  const handleClearSearch = () => {
    setSearchId('');
    dispatch(clearSearch());
  };

  const handleOpenAddForm = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditForm = (employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingEmployee) {
      await dispatch(updateEmployee({ id: editingEmployee.id, data: formData }));
    } else {
      await dispatch(addEmployee(formData));
    }
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  const handleDeletePrompt = (employee) => {
    setDeletingEmployee(employee);
  };

  const handleConfirmDelete = async () => {
    if (deletingEmployee) {
      await dispatch(deleteEmployee(deletingEmployee.id));
      setDeletingEmployee(null);
    }
  };

  // Determine displayed list
  const displayedEmployees = Array.isArray(searchedEmployee)
    ? searchedEmployee
    : searchedEmployee
    ? [searchedEmployee]
    : employees;

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-icon">
            <Users size={28} />
          </div>
          <div>
            <h1>Employee Directory</h1>
            <p className="subtitle">Manage staff details, locations, and contacts</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => {
              dispatch(fetchEmployees());
              dispatch(fetchCountries());
            }}
            className="btn btn-outline"
            title="Refresh Data"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={handleOpenAddForm} className="btn btn-primary">
            <Plus size={18} /> Add Employee
          </button>
        </div>
      </header>

      {/* Global Notifications */}
      <div className="notifications-container">
        {error && <ErrorAlert message={error} onClose={() => dispatch(clearMessages())} />}
        {successMessage && (
          <SuccessAlert message={successMessage} onClose={() => dispatch(clearMessages())} />
        )}
      </div>

      {/* Toolbar & Search Section */}
      <div className="toolbar-section card">
        <SearchBar
          searchId={searchId}
          setSearchId={setSearchId}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isSearching={isSearching}
        />
        <div className="count-badge">
          <UserCheck size={16} />
          <span>Total Shown: {displayedEmployees.length}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content card">
        {/* Active Search Filter Banner */}
        {searchedEmployee && (
          <div className="search-filter-banner">
            <span>
              Showing search results matching filter query.
            </span>
            <button onClick={handleClearSearch} className="btn-link">
              Show All Employees
            </button>
          </div>
        )}

        {/* Search Error State */}
        {searchError && !isSearching && (
          <div className="search-error-box">
            <XCircle size={32} className="text-danger mb-2" />
            <h3>No Employee Found</h3>
            <p>{searchError}</p>
            <button onClick={handleClearSearch} className="btn btn-secondary mt-3">
              Clear Search & View All
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner message="Fetching latest employee records..." />}

        {/* Empty State */}
        {!loading && !searchError && displayedEmployees.length === 0 && (
          <EmptyState
            title="No Employees Recorded"
            message="No employee profiles exist in the system yet."
            onAddClick={handleOpenAddForm}
          />
        )}

        {/* Employee Table */}
        {!loading && !searchError && displayedEmployees.length > 0 && (
          <EmployeeTable
            employees={displayedEmployees}
            onEdit={handleOpenEditForm}
            onDelete={handleDeletePrompt}
          />
        )}
      </main>

      {/* Add / Edit Form Modal */}
      {isFormModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content modal-form">
            <div className="modal-header">
              <h3>{editingEmployee ? 'Edit Employee Details' : 'Create New Employee'}</h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="btn-icon"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <EmployeeForm
                initialData={editingEmployee}
                countries={countries}
                onSubmit={handleFormSubmit}
                onCancel={() => setIsFormModalOpen(false)}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingEmployee)}
        title="Delete Employee"
        message={
          deletingEmployee
            ? `Are you sure you want to delete ${deletingEmployee.name} (ID: ${deletingEmployee.id})? This action cannot be undone.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingEmployee(null)}
        isLoading={loading}
      />
    </div>
  );
};
