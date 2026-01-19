import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Toaster, toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  language: 'en' | 'ne';
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    toast.success('Logged in', { style: { background: 'green', color: 'white' } });
  };

  const handleLogout = () => {
    setUser(null);
    toast.error('Logged out', { style: { background: 'red', color: 'white' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
