import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import { updateProfile, changePassword } from '../services/authService';
import { User, Mail, Phone, Save, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

function Profile() {
  const { user, setUser } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const updateMutation = useMutation(
    (data) => updateProfile(data),
    {
      onSuccess: (data) => {
        setUser(data.user);
        queryClient.invalidateQueries('user');
        toast.success('Profile updated successfully');
        setIsEditing(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to update profile');
      }
    }
  );

  const passwordMutation = useMutation(
    (data) => changePassword(data),
    {
      onSuccess: () => {
        toast.success('Password changed successfully');
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      },
      onError: (error) => {
        toast.error(error.response?.data?.error || 'Failed to change password');
      }
    }
  );

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    passwordMutation.mutate({
      current_password: passwordData.current_password,
      new_password: passwordData.new_password
    });
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-primary-500 hover:text-primary-600 font-semibold"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={user.username}
                disabled
                className="input-field bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                disabled={updateMutation.isLoading}
                className="w-full bg-primary-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={passwordData.current_password}
                  onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={passwordData.new_password}
                  onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                  className="input-field pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={(e) => setPasswordData({...passwordData, confirm_password: e.target.value})}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passwordMutation.isLoading}
              className="w-full bg-primary-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {passwordMutation.isLoading ? 'Changing Password...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
