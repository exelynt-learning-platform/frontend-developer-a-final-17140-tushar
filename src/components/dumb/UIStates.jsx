import React from 'react';
import { Loader2, AlertCircle, CheckCircle2, UserX } from 'lucide-react';

export const LoadingSpinner = ({ message = 'Loading employee data...' }) => (
  <div className="state-card loading-state">
    <Loader2 className="animate-spin text-primary" size={32} />
    <p>{message}</p>
  </div>
);

export const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="alert-card alert-error">
      <div className="flex-align">
        <AlertCircle size={20} className="alert-icon" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="alert-close" aria-label="Close message">
          ×
        </button>
      )}
    </div>
  );
};

export const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="alert-card alert-success">
      <div className="flex-align">
        <CheckCircle2 size={20} className="alert-icon" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="alert-close" aria-label="Close message">
          ×
        </button>
      )}
    </div>
  );
};

export const EmptyState = ({ title = 'No Employees Found', message = 'Get started by creating a new employee profile.', onAddClick }) => (
  <div className="state-card empty-state">
    <UserX size={48} className="empty-icon" />
    <h3>{title}</h3>
    <p>{message}</p>
    {onAddClick && (
      <button onClick={onAddClick} className="btn btn-primary mt-4">
        Add Employee
      </button>
    )}
  </div>
);
