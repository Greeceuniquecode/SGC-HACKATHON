import React, { useState } from 'react';
import { User } from '../App';
import { Heart, Globe } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const translations = {
    en: {
      title: 'Health Care App',
      subtitle: 'Your Personal Health Assistant',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      login: 'Login',
      signup: 'Sign Up',
      switchToSignup: "Don't have an account? Sign Up",
      switchToLogin: 'Already have an account? Login',
      aiFeatures: 'AI-Powered Symptom Checker',
      medicineId: 'Medicine Identification',
      reminders: 'Smart Reminders',
      emergency: 'Emergency Services'
    },
    ne: {
      title: 'स्वास्थ्य सेवा एप',
      subtitle: 'तपाईंको व्यक्तिगत स्वास्थ्य सहायक',
      email: 'इमेल',
      password: 'पासवर्ड',
      name: 'पूरा नाम',
      login: 'लगइन',
      signup: 'साइन अप',
      switchToSignup: 'खाता छैन? साइन अप गर्नुहोस्',
      switchToLogin: 'खाता छ? लगइन गर्नुहोस्',
      aiFeatures: 'एआई लक्षण परीक्षक',
      medicineId: 'औषधि पहिचान',
      reminders: 'स्मार्ट रिमाइन्डर',
      emergency: 'आपातकालीन सेवाहरू'
    }
  };

  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: User = {
      id: '1',
      name: name || email.split('@')[0],
      email,
      language
    };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Globe className="w-5 h-5 text-blue-600" />
          <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
        </button>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl mb-2">🤖</div>
              <p className="text-sm font-medium text-gray-700">{t.aiFeatures}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl mb-2">💊</div>
              <p className="text-sm font-medium text-gray-700">{t.medicineId}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl mb-2">⏰</div>
              <p className="text-sm font-medium text-gray-700">{t.reminders}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
              <div className="text-3xl mb-2">🚑</div>
              <p className="text-sm font-medium text-gray-700">{t.emergency}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {isSignUp ? t.signup : t.login}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              {isSignUp ? t.signup : t.login}
            </button>
          </form>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {isSignUp ? t.switchToLogin : t.switchToSignup}
          </button>
        </div>
      </div>
    </div>
  );
}
