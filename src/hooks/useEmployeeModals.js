import { useState } from 'react';

export const useEmployeeModals = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  const openAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  const openDeleteModal = (employee) => {
    setDeletingEmployee(employee);
  };

  const closeDeleteModal = () => {
    setDeletingEmployee(null);
  };

  return {
    isFormModalOpen,
    editingEmployee,
    deletingEmployee,
    openAddModal,
    openEditModal,
    closeFormModal,
    openDeleteModal,
    closeDeleteModal
  };
};
