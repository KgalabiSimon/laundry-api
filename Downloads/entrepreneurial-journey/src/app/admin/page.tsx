'use client';

import { useAdmin } from '@/contexts/AdminContext';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
