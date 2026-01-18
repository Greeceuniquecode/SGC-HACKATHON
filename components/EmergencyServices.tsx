import React from 'react';
import { Phone, AlertTriangle, MapPin, Clock } from 'lucide-react';

interface EmergencyServicesProps {
  language: 'en' | 'ne';
}

export function EmergencyServices({ language }: EmergencyServicesProps) {
  const translations = {
    en: {
      title: 'Emergency Services',
      subtitle: 'Quick access to emergency contacts and services',
      ambulance: 'Call Ambulance',
      ambulanceNumber: '102',
      police: 'Police',
      policeNumber: '100',
      fire: 'Fire Department',
      fireNumber: '101',
      emergency: 'Medical Emergency',
      emergencyNumber: '103',
      instructions: 'Emergency Instructions',
      step1: '1. Stay calm and assess the situation',
      step2: '2. Call the appropriate emergency number',
      step3: '3. Provide clear location information',
      step4: '4. Follow dispatcher instructions',
      step5: '5. Do not hang up until told to do so',
      nearbyHospitals: 'Nearby Emergency Hospitals',
      hospitalName: 'Hospital Name',
      available24: 'Available 24/7',
      warning: 'Only call emergency services in case of actual emergencies'
    },
    ne: {
      title: 'आपातकालीन सेवाहरू',
      subtitle: 'आपातकालीन सम्पर्क र सेवाहरूमा द्रुत पहुँच',
      ambulance: 'एम्बुलेन्स कल गर्नुहोस्',
      ambulanceNumber: '१०२',
      police: 'प्रहरी',
      policeNumber: '१००',
      fire: 'अग्नि नियन्त्रण',
      fireNumber: '१०१',
      emergency: 'चिकित्सा आपातकालीन',
      emergencyNumber: '१०३',
      instructions: 'आपातकालीन निर्देशनहरू',
      step1: '१. शान्त रहनुहोस् र स्थिति मूल्याङ्कन गर्नुहोस्',
      step2: '२. उपयुक्त आपातकालीन नम्बरमा कल गर्नुहोस्',
      step3: '३. स्पष्ट स्थान जानकारी प्रदान गर्नुहोस्',
      step4: '४. डिस्प्याचर निर्देशनहरू पालना गर्नुहोस्',
      step5: '५. भनिएसम्म फोन नकाट्नुहोस्',
      nearbyHospitals: 'नजिकका आपातकालीन अस्पतालहरू',
      hospitalName: 'अस्पतालको नाम',
      available24: '२४/७ उपलब्ध',
      warning: 'वास्तविक आपतकालीन अवस्थामा मात्र आपातकालीन सेवाहरूमा कल गर्नुहोस्'
    }
  };

  const t = translations[language];

  const emergencyNumbers = [
    {
      name: t.ambulance,
      number: language === 'en' ? '102' : '१०२',
      color: 'from-red-500 to-red-600',
      icon: '🚑'
    },
    {
      name: t.police,
      number: language === 'en' ? '100' : '१००',
      color: 'from-blue-500 to-blue-600',
      icon: '👮'
    },
    {
      name: t.fire,
      number: language === 'en' ? '101' : '१०१',
      color: 'from-orange-500 to-orange-600',
      icon: '🚒'
    },
    {
      name: t.emergency,
      number: language === 'en' ? '103' : '१०३',
      color: 'from-purple-500 to-purple-600',
      icon: '⚕️'
    }
  ];

  const emergencyHospitals = [
    {
      name: 'B.P. Koirala Institute of Health Sciences',
      nameNe: 'बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान',
      phone: '+977-1-4412303',
      address: 'Dharan, Nepal',
      addressNe: 'धरान, नेपाल'
    },
    {
      name: 'Norvic International Hospital',
      nameNe: 'नर्भिक अन्तर्राष्ट्रिय अस्पताल',
      phone: '+977-1-4258554',
      address: 'Thapathali, Kathmandu',
      addressNe: 'थापाथली, काठमाडौं'
    },
    {
      name: 'Grande International Hospital',
      nameNe: 'ग्रान्डे अन्तर्राष्ट्रिय अस्पताल',
      phone: '+977-1-5159266',
      address: 'Dhapasi, Kathmandu',
      addressNe: 'ढापासी, काठमाडौं'
    }
  ];

  const handleEmergencyCall = (number: string) => {
    // Remove Nepali numerals for actual calling
    const actualNumber = number.replace(/[१२३४५६७८९०]/g, (match) => {
      const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      return nepaliDigits.indexOf(match).toString();
    });
    window.location.href = `tel:${actualNumber}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-red-900 font-medium">{t.warning}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {emergencyNumbers.map((emergency) => (
          <button
            key={emergency.number}
            onClick={() => handleEmergencyCall(emergency.number)}
            className={`bg-gradient-to-r ${emergency.color} text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{emergency.icon}</span>
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">{emergency.name}</h3>
            <div className="text-3xl font-bold">{emergency.number}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          {t.instructions}
        </h3>
        <div className="space-y-3">
          {[t.step1, t.step2, t.step3, t.step4, t.step5].map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-red-600" />
          {t.nearbyHospitals}
        </h3>
        <div className="space-y-3">
          {emergencyHospitals.map((hospital, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-gray-900">
                    {language === 'en' ? hospital.name : hospital.nameNe}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{language === 'en' ? hospital.address : hospital.addressNe}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${hospital.phone}`} className="hover:text-blue-600">
                      {hospital.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">{t.available24}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEmergencyCall(hospital.phone)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  {t.ambulance.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
