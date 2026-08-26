import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmployeeForm, validateEmployeeForm } from '../components/dumb/EmployeeForm';
import { EmployeeTable } from '../components/dumb/EmployeeTable';

describe('EmployeeForm Component & Validations', () => {
  const mockCountries = [
    { id: '1', name: 'United States' },
    { id: '2', name: 'India' }
  ];

  it('validates empty form inputs correctly', () => {
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

  it('renders pre-populated values when initialData is provided', () => {
    const initialData = {
      id: '10',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      mobile: '9876543210',
      country: 'United States',
      state: 'New York',
      district: 'Manhattan'
    };

    render(
      <EmployeeForm
        initialData={initialData}
        countries={mockCountries}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByDisplayValue('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('9876543210')).toBeInTheDocument();
  });
});

describe('EmployeeTable Component', () => {
  const mockEmployees = [
    {
      id: '1',
      name: 'Bob Smith',
      email: 'bob@example.com',
      mobile: '9123456789',
      country: 'Canada'
    }
  ];

  it('renders employee rows with correct data and triggers edit/delete callbacks', () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();

    const editBtn = screen.getByLabelText('Edit Bob Smith');
    const deleteBtn = screen.getByLabelText('Delete Bob Smith');

    fireEvent.click(editBtn);
    expect(handleEdit).toHaveBeenCalledWith(mockEmployees[0]);

    fireEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith(mockEmployees[0]);
  });
});
