import React, { useState } from 'react';
import { User } from '../types';
import { updateUserProfile } from '../services/storage';
import { Shield, User as UserIcon, Lock } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, email, name, password };
    updateUserProfile(updatedUser);
    onUpdate(updatedUser);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
        
        <div className="glass-panel p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <UserIcon size={16} /> Full Name
                </label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input px-4 py-3 rounded-xl"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Shield size={16} /> Email Address
                </label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input px-4 py-3 rounded-xl"
                />
            </div>

            <div>
                <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Lock size={16} /> New Password
                </label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass-input px-4 py-3 rounded-xl"
                />
            </div>

            <div className="pt-4">
                <button className="w-full glass-button py-3 rounded-xl text-white font-bold shadow-lg hover:shadow-blue-500/20">
                    Save Changes
                </button>
            </div>

            {message && (
                <div className="p-3 rounded-xl bg-green-500/20 text-green-300 text-center text-sm border border-green-500/30 animate-fade-in">
                    {message}
                </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;