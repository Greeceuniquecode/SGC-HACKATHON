import React, { useState } from 'react';
import { User } from '../App';
import { 
  Stethoscope, 
  Camera, 
  MapPin, 
  Bell, 
  AlertTriangle, 
  Info,
  Phone,
  LogOut,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { SymptomChecker } from './SymptomChecker';
import { MedicineIdentifier } from './MedicineIdentifier';
import { HealthServices } from './HealthServices';
import { Reminders } from './Reminders';
import { HealthInfo } from './HealthInfo';
import { EmergencyServices } from './EmergencyServices';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('symptom-checker');
  const [language, setLanguage] = useState<'en' | 'ne'>(user.language);
  const [menuOpen, setMenuOpen] = useState(false);

  const translations = {
    en: {
      welcome: 'Welcome',
      symptomChecker: 'Symptom Checker',
      medicineId: 'Medicine ID',
      healthServices: 'Health Services',
      reminders: 'Reminders',
      healthInfo: 'Health Info',
      emergency: 'Emergency',
      logout: 'Logout'
    },
    ne: {
      welcome: 'स्वागत छ',
      symptomChecker: 'लक्षण परीक्षक',
      medicineId: 'औषधि पहिचान',
      healthServices: 'स्वास्थ्य सेवाहरू',
      reminders: 'रिमाइन्डर',
      healthInfo: 'स्वास्थ्य जानकारी',
      emergency: 'आपातकालीन',
      logout: 'लगआउट'
    }
  };

  const t = translations[language];

  const navItems = [
    { id: 'symptom-checker', label: t.symptomChecker, icon: Stethoscope },
    { id: 'medicine-id', label: t.medicineId, icon: Camera },
    { id: 'health-services', label: t.healthServices, icon: MapPin },
    { id: 'reminders', label: t.reminders, icon: Bell },
    { id: 'health-info', label: t.healthInfo, icon: Info },
    { id: 'emergency', label: t.emergency, icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{t.welcome}, {user.name}!</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Change Language"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t.logout}</span>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>{t.logout}</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      <div className="flex-1 flex">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden md:block w-64 bg-white shadow-lg">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'symptom-checker' && <SymptomChecker language={language} />}
            {activeTab === 'medicine-id' && <MedicineIdentifier language={language} />}
            {activeTab === 'health-services' && <HealthServices language={language} />}
            {activeTab === 'reminders' && <Reminders language={language} />}
            {activeTab === 'health-info' && <HealthInfo language={language} />}
            {activeTab === 'emergency' && <EmergencyServices language={language} />}
          </div>
        </main>
      </div>
    </div>
  );
}
