import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardPage from './AdminDashboardPage';
import AdminLoginPage from './AdminLoginPage';

export default function AdminPage() {
  const token = localStorage.getItem('sbp_admin_token');

  if (!token) {
    return <AdminLoginPage />;
  }

  return <AdminDashboardPage />;
}
