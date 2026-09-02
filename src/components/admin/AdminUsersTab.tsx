import React, { useState, useEffect, memo } from 'react';
import { api, AdminUser } from '../../services/apiClient.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import {
  Users,
  UserPlus,
  KeyRound,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User,
  Check,
  X,
  Clock,
} from 'lucide-react';

export const AdminUsersTab: React.FC = memo(function AdminUsersTab() {
  const { user: currentUser, changePassword, getIdToken } = useAuth();

  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangeMyPasswordOpen, setIsChangeMyPasswordOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<AdminUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  // Create User Form State
  const [createForm, setCreateForm] = useState({
    username: '',
    email: '',
    displayName: '',
    password: '',
    role: 'admin' as 'super_admin' | 'admin' | 'editor',
    mustChangePassword: true,
  });
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  // Edit User Form State
  const [editForm, setEditForm] = useState({
    displayName: '',
    email: '',
    role: 'admin' as 'super_admin' | 'admin' | 'editor',
    isActive: true,
    newPassword: '',
    mustChangePassword: false,
  });
  const [showEditPassword, setShowEditPassword] = useState(false);

  // Change My Password State
  const [myOldPassword, setMyOldPassword] = useState('');
  const [myNewPassword, setMyNewPassword] = useState('');
  const [myConfirmPassword, setMyConfirmPassword] = useState('');
  const [showMyOldPass, setShowMyOldPass] = useState(false);
  const [showMyNewPass, setShowMyNewPass] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Load Users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const data = await api.adminGetUsers(token || undefined);
      setUsersList(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load administrator accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  // Generate a friendly strong password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
    let pass = 'Drish@';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  // Create User Handler
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.username.trim() || !createForm.email.trim() || !createForm.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const token = (await getIdToken()) || '';
      await api.adminCreateUser(
        token,
        {
          username: createForm.username.trim(),
          email: createForm.email.trim(),
          displayName: createForm.displayName.trim() || createForm.username.trim(),
          password: createForm.password,
          role: createForm.role,
          mustChangePassword: createForm.mustChangePassword,
        }
      );

      showNotification(`Administrator "${createForm.username}" successfully created!`);
      setIsCreateModalOpen(false);
      setCreateForm({
        username: '',
        email: '',
        displayName: '',
        password: '',
        role: 'admin',
        mustChangePassword: true,
      });
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to create user.');
    }
  };

  // Open Edit Modal
  const openEditModal = (u: AdminUser) => {
    setSelectedUserForEdit(u);
    setEditForm({
      displayName: u.displayName || u.username,
      email: u.email,
      role: u.role,
      isActive: u.isActive !== false,
      newPassword: '',
      mustChangePassword: Boolean(u.mustChangePassword),
    });
    setIsEditModalOpen(true);
  };

  // Update User Handler
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForEdit) return;

    try {
      const token = (await getIdToken()) || '';
      const updatePayload: any = {
        displayName: editForm.displayName,
        email: editForm.email,
        role: editForm.role,
        isActive: editForm.isActive,
        mustChangePassword: editForm.mustChangePassword,
      };
      if (editForm.newPassword && editForm.newPassword.trim().length >= 6) {
        updatePayload.password = editForm.newPassword.trim();
      }

      await api.adminUpdateUser(token, selectedUserForEdit.id, updatePayload);
      showNotification(`Account "${selectedUserForEdit.username}" updated successfully!`);
      setIsEditModalOpen(false);
      setSelectedUserForEdit(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to update user.');
    }
  };

  // Delete User Handler
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      const token = (await getIdToken()) || '';
      await api.adminDeleteUser(token, userToDelete.id);
      showNotification(`Admin account "${userToDelete.username}" has been removed.`);
      setUserToDelete(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to delete user.');
    }
  };

  // Change My Own Password Handler
  const handleMyPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myNewPassword || myNewPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    if (myNewPassword !== myConfirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsSubmittingPassword(true);
    setError(null);
    try {
      await changePassword(myNewPassword, myOldPassword);
      showNotification('Your administrator password has been updated securely!');
      setIsChangeMyPasswordOpen(false);
      setMyOldPassword('');
      setMyNewPassword('');
      setMyConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Never';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#0876B9]/10 text-[#0876B9] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Users & Access Control</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage console administrators, assign passwords, and enforce first-login password updates.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsChangeMyPasswordOpen(true)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#0876B9]" />
            <span>Change My Password</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCreateForm({
                username: '',
                email: '',
                displayName: '',
                password: generateRandomPassword(),
                role: 'admin',
                mustChangePassword: true,
              });
              setIsCreateModalOpen(true);
            }}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0876B9] hover:bg-[#065E94] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create New Admin</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-800 dark:text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-rose-600 hover:text-rose-800 dark:hover:text-rose-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Accounts ({usersList.length})
          </div>
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="text-xs text-slate-500 hover:text-[#0876B9] flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {loading && usersList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0876B9]" />
            Loading accounts...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Account Status</th>
                  <th className="py-3 px-4 font-semibold">Password State</th>
                  <th className="py-3 px-4 font-semibold">Last Login</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {usersList.map((u) => {
                  const isCurrent = currentUser?.id === u.id || currentUser?.username === u.username;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-750 transition-colors">
                      {/* User details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0876B9] to-sky-400 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                            {(u.displayName || u.username || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{u.displayName || u.username}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-[#0876B9]/15 text-[#0876B9] dark:text-[#38BDF8] rounded">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <span>@{u.username}</span>
                              <span>•</span>
                              <span>{u.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role badge */}
                      <td className="py-3.5 px-4">
                        {u.role === 'super_admin' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            <Shield className="w-3 h-3" />
                            <span>Super Admin</span>
                          </span>
                        ) : u.role === 'editor' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <span>Editor</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Admin</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {u.isActive !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span>Suspended</span>
                          </span>
                        )}
                      </td>

                      {/* Password State */}
                      <td className="py-3.5 px-4">
                        {u.mustChangePassword ? (
                          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/80 text-[11px]">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Change on 1st Login</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Secure / Custom</span>
                          </span>
                        )}
                      </td>

                      {/* Last Login */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{formatDate(u.lastLogin)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(u)}
                            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                            title="Edit User & Reset Password"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {u.id !== 1 && !isCurrent && (
                            <button
                              type="button"
                              onClick={() => setUserToDelete(u)}
                              className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-500 transition-colors cursor-pointer"
                              title="Delete Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE NEW ADMIN USER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0876B9]/10 text-[#0876B9] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold">Create New Admin User</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Display Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={createForm.displayName}
                      onChange={(e) => setCreateForm({ ...createForm, displayName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Username <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={createForm.username}
                    onChange={(e) => setCreateForm({ ...createForm, username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '') })}
                    placeholder="e.g. john.ops"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    placeholder="john@drishinfotech.com"
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role & Permissions
                  </label>
                  <select
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  >
                    <option value="admin">Administrator (Full Edit)</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="editor">Editor (Content Only)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Initial Password <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCreateForm({ ...createForm, password: generateRandomPassword() })}
                      className="text-[10px] text-[#0876B9] hover:underline flex items-center gap-0.5"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Generate</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showCreatePassword ? 'text' : 'password'}
                      required
                      value={createForm.password}
                      onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                      placeholder="Min 6 chars"
                      className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-[#0876B9]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePassword(!showCreatePassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCreatePassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Force Password Change Toggle */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-lg flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="mustChangePassCheckbox"
                  checked={createForm.mustChangePassword}
                  onChange={(e) => setCreateForm({ ...createForm, mustChangePassword: e.target.checked })}
                  className="mt-0.5 rounded text-[#0876B9] focus:ring-[#0876B9]"
                />
                <label htmlFor="mustChangePassCheckbox" className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                  <span className="font-semibold text-slate-900 dark:text-white">Require password change on first login</span>
                  <br />
                  User will be prompted to set a new personal password when they first log into the admin console.
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0876B9] hover:bg-[#065E94] text-white font-semibold shadow-xs cursor-pointer"
                >
                  Create Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER & RESET PASSWORD MODAL */}
      {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-lg w-full p-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-base font-bold">Edit Account: @{selectedUserForEdit.username}</h3>
                <p className="text-xs text-slate-500">Update account privileges, state, or reset password.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    disabled={selectedUserForEdit.id === 1}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9] disabled:opacity-60"
                  >
                    <option value="admin">Administrator</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editForm.isActive ? 'active' : 'suspended'}
                    disabled={selectedUserForEdit.id === 1}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === 'active' })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9] disabled:opacity-60"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended / Inactive</option>
                  </select>
                </div>
              </div>

              {/* Reset Password Subsection */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#0876B9]" />
                    <span>Reset User Password (Optional)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, newPassword: generateRandomPassword(), mustChangePassword: true })}
                    className="text-[10px] text-[#0876B9] hover:underline flex items-center gap-0.5"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Generate New</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showEditPassword ? 'text' : 'password'}
                    value={editForm.newPassword}
                    onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                    placeholder="Leave blank to keep current password"
                    className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-[#0876B9]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword(!showEditPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showEditPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editMustChangeCheckbox"
                    checked={editForm.mustChangePassword}
                    onChange={(e) => setEditForm({ ...editForm, mustChangePassword: e.target.checked })}
                    className="rounded text-[#0876B9] focus:ring-[#0876B9]"
                  />
                  <label htmlFor="editMustChangeCheckbox" className="text-[11px] text-slate-600 dark:text-slate-300">
                    Require user to change password on next login
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0876B9] hover:bg-[#065E94] text-white font-semibold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE MY PASSWORD MODAL */}
      {isChangeMyPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xl max-w-md w-full p-6 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0876B9]/10 text-[#0876B9] flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold">Update My Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsChangeMyPasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMyPasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showMyOldPass ? 'text' : 'password'}
                    required
                    value={myOldPassword}
                    onChange={(e) => setMyOldPassword(e.target.value)}
                    placeholder="Enter existing password"
                    className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMyOldPass(!showMyOldPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showMyOldPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showMyNewPass ? 'text' : 'password'}
                    required
                    value={myNewPassword}
                    onChange={(e) => setMyNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMyNewPass(!showMyNewPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showMyNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={myConfirmPassword}
                  onChange={(e) => setMyConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-hidden focus:border-[#0876B9]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsChangeMyPasswordOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="px-4 py-2 rounded-lg bg-[#0876B9] hover:bg-[#065E94] text-white font-semibold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE USER CONFIRMATION MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900 shadow-2xl max-w-sm w-full p-6 text-slate-900 dark:text-white">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 flex items-center justify-center mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold mb-1">Delete Administrator?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Are you sure you want to permanently remove <span className="font-semibold text-slate-900 dark:text-white">@{userToDelete.username}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
