import React from 'react';
import { Edit2, Trash2, Mail, Phone, Globe, Hash } from 'lucide-react';

export const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return null;
  }

  return (
    <div className="table-responsive">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="table-row">
              <td className="emp-id">
                <span className="badge badge-id">
                  <Hash size={12} /> {emp.id}
                </span>
              </td>
              <td className="emp-name">{emp.name}</td>
              <td className="emp-email">
                <div className="flex-align">
                  <Mail size={14} className="text-muted" />
                  <span>{emp.email}</span>
                </div>
              </td>
              <td className="emp-mobile">
                <div className="flex-align">
                  <Phone size={14} className="text-muted" />
                  <span>{emp.mobile}</span>
                </div>
              </td>
              <td className="emp-country">
                <div className="flex-align">
                  <Globe size={14} className="text-muted" />
                  <span>{emp.country || 'N/A'}</span>
                </div>
              </td>
              <td className="emp-actions">
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(emp)}
                    className="btn-icon btn-edit"
                    title="Edit Employee"
                    aria-label={`Edit ${emp.name}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(emp)}
                    className="btn-icon btn-delete"
                    title="Delete Employee"
                    aria-label={`Delete ${emp.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
