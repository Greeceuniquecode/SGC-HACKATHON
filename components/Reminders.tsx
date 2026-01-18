import React, { useState } from 'react';
import { Plus, Trash2, Bell, Pill, Syringe, Clock } from 'lucide-react';

interface RemindersProps {
  language: 'en' | 'ne';
}

interface Reminder {
  id: string;
  type: 'medicine' | 'vaccination';
  name: string;
  nameNe: string;
  time: string;
  frequency: string;
  frequencyNe: string;
  notes: string;
  notesNe: string;
  enabled: boolean;
}

export function Reminders({ language }: RemindersProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'medicine',
      name: 'Paracetamol 500mg',
      nameNe: 'प्यारासिटामोल ५०० मिलीग्राम',
      time: '08:00',
      frequency: 'Every 8 hours',
      frequencyNe: 'हरेक ८ घण्टा',
      notes: 'Take after meals',
      notesNe: 'खाना पछि लिनुहोस्',
      enabled: true
    },
    {
      id: '2',
      type: 'vaccination',
      name: 'COVID-19 Booster',
      nameNe: 'कोभिड-१९ बूस्टर',
      time: '10:00',
      frequency: 'Once',
      frequencyNe: 'एक पटक',
      notes: 'Scheduled for next month',
      notesNe: 'अर्को महिनाको लागि निर्धारित',
      enabled: true
    },
    {
      id: '3',
      type: 'medicine',
      name: 'Vitamin D3',
      nameNe: 'भिटामिन डी३',
      time: '20:00',
      frequency: 'Daily',
      frequencyNe: 'दैनिक',
      notes: 'Take with dinner',
      notesNe: 'बेलुकाको खानासँग लिनुहोस्',
      enabled: true
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    type: 'medicine' as 'medicine' | 'vaccination',
    name: '',
    nameNe: '',
    time: '',
    frequency: '',
    frequencyNe: '',
    notes: '',
    notesNe: ''
  });

  const translations = {
    en: {
      title: 'Medicine & Vaccination Reminders',
      subtitle: 'Never miss your medications and vaccinations',
      addReminder: 'Add Reminder',
      medicine: 'Medicine',
      vaccination: 'Vaccination',
      time: 'Time',
      frequency: 'Frequency',
      notes: 'Notes',
      save: 'Save Reminder',
      cancel: 'Cancel',
      delete: 'Delete',
      enabled: 'Enabled',
      disabled: 'Disabled',
      noReminders: 'No reminders yet. Add one to get started!',
      name: 'Name',
      type: 'Type'
    },
    ne: {
      title: 'औषधि र खोप रिमाइन्डर',
      subtitle: 'आफ्नो औषधि र खोपहरू नछुटाउनुहोस्',
      addReminder: 'रिमाइन्डर थप्नुहोस्',
      medicine: 'औषधि',
      vaccination: 'खोप',
      time: 'समय',
      frequency: 'आवृत्ति',
      notes: 'टिप्पणीहरू',
      save: 'रिमाइन्डर सुरक्षित गर्नुहोस्',
      cancel: 'रद्द गर्नुहोस्',
      delete: 'मेटाउनुहोस्',
      enabled: 'सक्षम छ',
      disabled: 'अक्षम छ',
      noReminders: 'अझै कुनै रिमाइन्डर छैन। सुरु गर्न एउटा थप्नुहोस्!',
      name: 'नाम',
      type: 'प्रकार'
    }
  };

  const t = translations[language];

  const handleAddReminder = () => {
    if (!newReminder.name || !newReminder.time || !newReminder.frequency) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      ...newReminder,
      enabled: true
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      type: 'medicine',
      name: '',
      nameNe: '',
      time: '',
      frequency: '',
      frequencyNe: '',
      notes: '',
      notesNe: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        {t.addReminder}
      </button>

      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">{t.addReminder}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.type}
              </label>
              <select
                value={newReminder.type}
                onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value as 'medicine' | 'vaccination' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="medicine">{t.medicine}</option>
                <option value="vaccination">{t.vaccination}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                value={newReminder.name}
                onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder={language === 'en' ? 'Medicine/Vaccine name' : 'औषधि/खोपको नाम'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.time}
              </label>
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.frequency}
              </label>
              <input
                type="text"
                value={newReminder.frequency}
                onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder={language === 'en' ? 'e.g., Daily, Every 8 hours' : 'उदाहरण: दैनिक, हरेक ८ घण्टा'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.notes}
            </label>
            <textarea
              value={newReminder.notes}
              onChange={(e) => setNewReminder({ ...newReminder, notes: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={3}
              placeholder={language === 'en' ? 'Additional notes...' : 'अतिरिक्त टिप्पणीहरू...'}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddReminder}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
            >
              {t.save}
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {reminders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.noReminders}</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`bg-white rounded-xl shadow-lg p-6 transition-all ${
                reminder.enabled ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    reminder.type === 'medicine' 
                      ? 'bg-blue-100' 
                      : 'bg-green-100'
                  }`}>
                    {reminder.type === 'medicine' ? (
                      <Pill className={`w-6 h-6 ${reminder.type === 'medicine' ? 'text-blue-600' : 'text-green-600'}`} />
                    ) : (
                      <Syringe className={`w-6 h-6 ${reminder.type === 'medicine' ? 'text-blue-600' : 'text-green-600'}`} />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {language === 'en' ? reminder.name : (reminder.nameNe || reminder.name)}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        reminder.type === 'medicine'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {reminder.type === 'medicine' ? t.medicine : t.vaccination}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{reminder.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bell className="w-4 h-4" />
                        <span>{language === 'en' ? reminder.frequency : (reminder.frequencyNe || reminder.frequency)}</span>
                      </div>
                    </div>

                    {reminder.notes && (
                      <p className="text-sm text-gray-600">
                        {language === 'en' ? reminder.notes : (reminder.notesNe || reminder.notes)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      reminder.enabled
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                    title={reminder.enabled ? t.enabled : t.disabled}
                  >
                    <Bell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title={t.delete}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
