import React, { useState } from 'react';
import { User } from '../types';
import { getUsers, saveUser } from '../services/storage';
import { ArrowRight, LayoutGrid } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const users = getUsers();

    if (isRegistering) {
      if (users.find(u => u.email === email)) {
        setError('User already exists');
        return;
      }
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        password,
        name
      };
      saveUser(newUser);
      onLogin(newUser);
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-[#111827]">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="glass-panel w-full max-w-md p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LayoutGrid className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ReturnServiceOS</h1>
          <p className="text-gray-400">Manage your activity proofs securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistering && (
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full glass-input px-5 py-3 rounded-xl"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full glass-input px-5 py-3 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full glass-input px-5 py-3 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" className="w-full glass-button py-3.5 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 group">
            {isRegistering ? 'Create Account' : 'Sign In'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="text-sm text-gray-400 hover:text-white transition-colors underline decoration-dotted"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;