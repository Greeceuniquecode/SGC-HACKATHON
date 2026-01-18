import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';

interface HealthServicesProps {
  language: 'en' | 'ne';
}

interface HealthFacility {
  id: string;
  name: string;
  nameNe: string;
  type: string;
  typeNe: string;
  address: string;
  addressNe: string;
  phone: string;
  distance: string;
  hours: string;
  hoursNe: string;
  lat: number;
  lng: number;
}

export function HealthServices({ language }: HealthServicesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.7172, 85.3240]); // Default to Kathmandu
  const [mapZoom, setMapZoom] = useState(13);

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPos = { lat: latitude, lng: longitude };
          setUserLocation(userPos);
          setMapCenter([latitude, longitude]);
          setMapZoom(15);
        },
        (error) => {
          console.log('Error getting location:', error);
          // Keep default Kathmandu location if geolocation fails
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

  const translations = {
    en: {
      title: 'Nearby Health Services',
      subtitle: 'Find hospitals, clinics, and pharmacies near you',
      search: 'Search location...',
      all: 'All',
      hospital: 'Hospital',
      clinic: 'Clinic',
      pharmacy: 'Pharmacy',
      emergency: 'Emergency',
      distance: 'Distance',
      phone: 'Phone',
      hours: 'Hours',
      directions: 'Get Directions',
      open: 'Open Now',
      closed: 'Closed'
    },
    ne: {
      title: 'नजिकका स्वास्थ्य सेवाहरू',
      subtitle: 'तपाईंको नजिक अस्पताल, क्लिनिक र फार्मेसीहरू फेला पार्नुहोस्',
      search: 'स्थान खोज्नुहोस्...',
      all: 'सबै',
      hospital: 'अस्पताल',
      clinic: 'क्लिनिक',
      pharmacy: 'फार्मेसी',
      emergency: 'आपातकालीन',
      distance: 'दूरी',
      phone: 'फोन',
      hours: 'समय',
      directions: 'दिशा प्राप्त गर्नुहोस्',
      open: 'खुला छ',
      closed: 'बन्द छ'
    }
  };

  const t = translations[language];

  const mockFacilities: HealthFacility[] = [
    {
      id: '1',
      name: 'Tribhuvan University Teaching Hospital',
      nameNe: 'त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल',
      type: 'hospital',
      typeNe: 'अस्पताल',
      address: 'Maharajgunj, Kathmandu',
      addressNe: 'महाराजगञ्ज, काठमाडौं',
      phone: '+977-1-4412303',
      distance: '2.3 km',
      hours: 'Open 24 hours',
      hoursNe: '२४ घण्टा खुला',
      lat: 27.7350,
      lng: 85.3290
    },
    {
      id: '2',
      name: 'Grande International Hospital',
      nameNe: 'ग्रान्डे अन्तर्राष्ट्रिय अस्पताल',
      type: 'hospital',
      typeNe: 'अस्पताल',
      address: 'Dhapasi, Kathmandu',
      addressNe: 'ढापासी, काठमाडौं',
      phone: '+977-1-5159266',
      distance: '3.8 km',
      hours: 'Open 24 hours',
      hoursNe: '२४ घण्टा खुला',
      lat: 27.7290,
      lng: 85.3210
    },
    {
      id: '3',
      name: 'Norvic International Hospital',
      nameNe: 'नर्भिक अन्तर्राष्ट्रिय अस्पताल',
      type: 'hospital',
      typeNe: 'अस्पताल',
      address: 'Thapathali, Kathmandu',
      addressNe: 'थापाथली, काठमाडौं',
      phone: '+977-1-4258554',
      distance: '4.2 km',
      hours: 'Open 24 hours',
      hoursNe: '२४ घण्टा खुला',
      lat: 27.6960,
      lng: 85.3200
    },
    {
      id: '4',
      name: 'City Care Clinic',
      nameNe: 'सिटी केयर क्लिनिक',
      type: 'clinic',
      typeNe: 'क्लिनिक',
      address: 'Putalisadak, Kathmandu',
      addressNe: 'पुतलीसडक, काठमाडौं',
      phone: '+977-1-4221111',
      distance: '1.5 km',
      hours: '7 AM - 8 PM',
      hoursNe: 'बिहान ७ - बेलुका ८',
      lat: 27.7100,
      lng: 85.3180
    },
    {
      id: '5',
      name: 'MedPlus Pharmacy',
      nameNe: 'मेडप्लस फार्मेसी',
      type: 'pharmacy',
      typeNe: 'फार्मेसी',
      address: 'New Road, Kathmandu',
      addressNe: 'नयाँ सडक, काठमाडौं',
      phone: '+977-1-4252525',
      distance: '0.8 km',
      hours: '6 AM - 10 PM',
      hoursNe: 'बिहान ६ - बेलुका १०',
      lat: 27.7050,
      lng: 85.3150
    },
    {
      id: '6',
      name: 'LifeCare Pharmacy',
      nameNe: 'लाइफकेयर फार्मेसी',
      type: 'pharmacy',
      typeNe: 'फार्मेसी',
      address: 'Lazimpat, Kathmandu',
      addressNe: 'लाजिम्पाट, काठमाडौं',
      phone: '+977-1-4412345',
      distance: '2.1 km',
      hours: 'Open 24 hours',
      hoursNe: '२४ घण्टा खुला',
      lat: 27.7280,
      lng: 85.3250
    }
  ];

  const filteredFacilities = mockFacilities.filter(facility => {
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.nameNe.includes(searchQuery) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hospital':
        return 'bg-red-100 text-red-700';
      case 'clinic':
        return 'bg-blue-100 text-blue-700';
      case 'pharmacy':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleGetDirections = (facility: HealthFacility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.lat},${facility.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'hospital', 'clinic', 'pharmacy'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === type
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t[type as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Location & Facilities Display */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {userLocation ? 'Your Location Detected' : 'Kathmandu Area'}
            </h3>
            {userLocation && (
              <p className="text-gray-600 mb-4">
                Coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </p>
            )}
            <p className="text-gray-600">
              {filteredFacilities.length} health facilities shown below
            </p>
            <button
              onClick={() => {
                const url = userLocation
                  ? `https://www.google.com/maps/search/health+facilities/@${userLocation.lat},${userLocation.lng},13z`
                  : 'https://www.google.com/maps/place/Kathmandu,+Nepal/@27.7172,85.3240,13z';
                window.open(url, '_blank');
              }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg"
            >
              View in Google Maps
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {language === 'en' ? facility.name : facility.nameNe}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(facility.type)}`}>
                      {language === 'en' ? facility.type : facility.typeNe}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{language === 'en' ? facility.address : facility.addressNe}</span>
                    <span className="text-sm font-semibold text-blue-600">({facility.distance})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a href={`tel:${facility.phone}`} className="text-sm hover:text-blue-600">
                      {facility.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{language === 'en' ? facility.hours : facility.hoursNe}</span>
                    {facility.hours.includes('24') && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">
                        {t.open}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleGetDirections(facility)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" />
                {t.directions}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
