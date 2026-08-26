import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-danger">
        <div className="modal-header">
          <div className="modal-title-wrapper text-danger">
            <AlertTriangle size={24} />
            <h3>{title || 'Confirm Action'}</h3>
          </div>
          <button onClick={onCancel} className="btn-icon" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <p>{message || 'Are you sure you want to proceed with this operation?'}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onCancel} className="btn btn-secondary" disabled={isLoading}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger" disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};
