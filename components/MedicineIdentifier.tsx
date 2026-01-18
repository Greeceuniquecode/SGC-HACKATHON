import React, { useState } from 'react';
import { Camera, Upload, Loader2, AlertCircle } from 'lucide-react';

interface MedicineIdentifierProps {
  language: 'en' | 'ne';
}

interface MedicineInfo {
  name: string;
  nameNe: string;
  genericName: string;
  genericNameNe: string;
  uses: string[];
  usesNe: string[];
  dosage: string;
  dosageNe: string;
  sideEffects: string[];
  sideEffectsNe: string[];
  warnings: string[];
  warningsNe: string[];
  photo: string;
}

export function MedicineIdentifier({ language }: MedicineIdentifierProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MedicineInfo | null>(null);

  const translations = {
    en: {
      title: 'AI Medicine Identifier',
      subtitle: 'Take a photo of your medicine to get detailed information',
      upload: 'Upload Image',
      takePicture: 'Take Picture',
      analyzing: 'Analyzing medicine...',
      medicineName: 'Medicine Name',
      genericName: 'Generic Name',
      uses: 'Uses',
      dosage: 'Dosage',
      sideEffects: 'Side Effects',
      warnings: 'Warnings',
      disclaimer: 'AI-generated information. Always consult a healthcare professional or pharmacist.',
      noImage: 'Please upload or take a picture of the medicine'
    },
    ne: {
      title: 'एआई औषधि पहिचानकर्ता',
      subtitle: 'विस्तृत जानकारी प्राप्त गर्न आफ्नो औषधिको फोटो खिच्नुहोस्',
      upload: 'छवि अपलोड गर्नुहोस्',
      takePicture: 'तस्वीर खिच्नुहोस्',
      analyzing: 'औषधि विश्लेषण गर्दै...',
      medicineName: 'औषधिको नाम',
      genericName: 'जेनेरिक नाम',
      uses: 'प्रयोगहरू',
      dosage: 'खुराक',
      sideEffects: 'साइड इफेक्टहरू',
      warnings: 'चेतावनीहरू',
      disclaimer: 'एआई-उत्पन्न जानकारी। सधैं स्वास्थ्य सेवा पेशेवर वा फार्मासिस्टसँग परामर्श गर्नुहोस्।',
      noImage: 'कृपया औषधिको तस्वीर अपलोड गर्नुहोस् वा खिच्नुहोस्'
    }
  };

  const t = translations[language];

  // Mock medicine database with multiple medicines
  const mockMedicineDatabase: MedicineInfo[] = [
    {
      name: 'Paracetamol 500mg',
      nameNe: 'प्यारासिटामोल ५०० मिलीग्राम',
      genericName: 'Acetaminophen',
      genericNameNe: 'एसिटामिनोफेन',
      uses: [
        'Relief of mild to moderate pain',
        'Reduction of fever',
        'Headache and body aches',
        'Cold and flu symptoms'
      ],
      usesNe: [
        'हल्का देखि मध्यम दुखाइको राहत',
        'ज्वरो कम गर्ने',
        'टाउको दुख्ने र शरीर दुख्ने',
        'चिसो र फ्लू लक्षणहरू'
      ],
      dosage: 'Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.',
      dosageNe: 'वयस्कहरू: हरेक ४-६ घण्टामा १-२ ट्याब्लेट। २४ घण्टामा अधिकतम ८ ट्याब्लेट।',
      sideEffects: [
        'Rare allergic reactions (rash, itching)',
        'Nausea (uncommon)',
        'Liver damage with overdose',
        'Abdominal pain (rare)'
      ],
      sideEffectsNe: [
        'दुर्लभ एलर्जी प्रतिक्रियाहरू (दाग, चिलाउने)',
        'वाकवाकी (असामान्य)',
        'ओभरडोजसँग कलेजो क्षति',
        'पेट दुख्ने (दुर्लभ)'
      ],
      warnings: [
        'Do not exceed recommended dose',
        'Avoid alcohol consumption',
        'Consult doctor if pregnant or breastfeeding',
        'Not for children under 6 without medical advice'
      ],
      warningsNe: [
        'सिफारिस गरिएको खुराक नाघ्नुहोस्',
        'मदिरा सेवनबाट बच्नुहोस्',
        'गर्भवती वा स्तनपान गराइरहेको भए डाक्टरसँग परामर्श गर्नुहोस्',
        'चिकित्सा सल्लाह बिना ६ वर्ष मुनिका बालबालिकाका लागि होइन'
      ],
      photo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    {
      name: 'Ibuprofen 200mg',
      nameNe: 'इबुप्रोफेन २०० मिलीग्राम',
      genericName: 'Ibuprofen',
      genericNameNe: 'इबुप्रोफेन',
      uses: [
        'Pain relief',
        'Reduction of inflammation',
        'Fever reduction',
        'Arthritis pain'
      ],
      usesNe: [
        'दुखाइ राहत',
        'सूजन कम गर्ने',
        'ज्वरो कम गर्ने',
        'गठिया दुखाइ'
      ],
      dosage: 'Adults: 200-400mg every 4-6 hours. Maximum 1200mg in 24 hours.',
      dosageNe: 'वयस्कहरू: हरेक ४-६ घण्टामा २००-४०० मिलीग्राम। २४ घण्टामा अधिकतम १२०० मिलीग्राम।',
      sideEffects: [
        'Stomach upset',
        'Heartburn',
        'Dizziness',
        'Increased blood pressure'
      ],
      sideEffectsNe: [
        'पेट खराब',
        'हर्टबर्न',
        'चक्कर आउने',
        'रक्तचाप बढ्ने'
      ],
      warnings: [
        'Avoid if allergic to aspirin',
        'May cause stomach bleeding',
        'Consult doctor for kidney/liver issues',
        'Not recommended during pregnancy'
      ],
      warningsNe: [
        'एस्पिरिनमा एलर्जी भए बच्नुहोस्',
        'पेट रक्तस्राव हुन सक्छ',
        'मृगौला/कलेजो समस्याका लागि डाक्टरसँग परामर्श गर्नुहोस्',
        'गर्भावस्थामा सिफारिस गरिएको छैन'
      ],
      photo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    {
      name: 'Amoxicillin 500mg',
      nameNe: 'एमोक्सिसिलिन ५०० मिलीग्राम',
      genericName: 'Amoxicillin',
      genericNameNe: 'एमोक्सिसिलिन',
      uses: [
        'Bacterial infections',
        'Ear infections',
        'Urinary tract infections',
        'Skin infections'
      ],
      usesNe: [
        'ब्याक्टेरियल संक्रमणहरू',
        'कान संक्रमणहरू',
        'मूत्र मार्ग संक्रमणहरू',
        'छाला संक्रमणहरू'
      ],
      dosage: 'Adults: 500mg every 8 hours for 7-10 days.',
      dosageNe: 'वयस्कहरू: ७-१० दिनका लागि हरेक ८ घण्टामा ५०० मिलीग्राम।',
      sideEffects: [
        'Diarrhea',
        'Nausea',
        'Vomiting',
        'Rash'
      ],
      sideEffectsNe: [
        'दस्त',
        'वाकवाकी',
        'वमन',
        'दाग'
      ],
      warnings: [
        'Complete full course of antibiotics',
        'May cause allergic reactions',
        'Avoid if penicillin allergic',
        'May interact with other medications'
      ],
      warningsNe: [
        'एन्टिबायोटिकहरूको पूर्ण कोर्स पूरा गर्नुहोस्',
        'एलर्जी प्रतिक्रियाहरू हुन सक्छ',
        'पेनिसिलिनमा एलर्जी भए बच्नुहोस्',
        'अन्य औषधिहरूसँग अन्तरक्रिया हुन सक्छ'
      ],
      photo: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
    },
    {
      name: 'Omeprazole 20mg',
      nameNe: 'ओमेप्राजोल २० मिलीग्राम',
      genericName: 'Omeprazole',
      genericNameNe: 'ओमेप्राजोल',
      uses: [
        'Acid reflux treatment',
        'Heartburn relief',
        'Stomach ulcer treatment',
        'GERD management'
      ],
      usesNe: [
        'एसिड रिफ्लक्स उपचार',
        'हर्टबर्न राहत',
        'पेटको घाउ उपचार',
        'जीईआरडी व्यवस्थापन'
      ],
      dosage: 'Adults: 20mg once daily for 4-8 weeks.',
      dosageNe: 'वयस्कहरू: ४-८ हप्ताका लागि दैनिक एक पटक २० मिलीग्राम।',
      sideEffects: [
        'Headache',
        'Nausea',
        'Diarrhea',
        'Abdominal pain'
      ],
      sideEffectsNe: [
        'टाउको दुख्ने',
        'वाकवाकी',
        'दस्त',
        'पेट दुख्ने'
      ],
      warnings: [
        'Long-term use may affect bone health',
        'May mask stomach cancer symptoms',
        'Consult doctor for persistent symptoms',
        'May interact with certain medications'
      ],
      warningsNe: [
        'दीर्घकालीन प्रयोगले हड्डी स्वास्थ्यमा असर गर्न सक्छ',
        'पेट क्यान्सरका लक्षणहरू लुकाउन सक्छ',
        'निरन्तर लक्षणहरूका लागि डाक्टरसँग परामर्श गर्नुहोस्',
        'केही औषधिहरूसँग अन्तरक्रिया हुन सक्छ'
      ],
      photo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    {
      name: 'Aspirin 75mg',
      nameNe: 'एस्पिरिन ७५ मिलीग्राम',
      genericName: 'Acetylsalicylic Acid',
      genericNameNe: 'एसिटिलसालिसिलिक एसिड',
      uses: [
        'Pain relief',
        'Fever reduction',
        'Heart attack prevention',
        'Blood clot prevention'
      ],
      usesNe: [
        'दुखाइ राहत',
        'ज्वरो कम गर्ने',
        'हर्ट अट्याक रोकथाम',
        'रक्त जमघट रोकथाम'
      ],
      dosage: 'Adults: 75-325mg daily for heart protection.',
      dosageNe: 'वयस्कहरू: हर्ट संरक्षणका लागि दैनिक ७५-३२५ मिलीग्राम।',
      sideEffects: [
        'Stomach irritation',
        'Heartburn',
        'Bruising',
        'Bleeding'
      ],
      sideEffectsNe: [
        'पेट चिढिने',
        'हर्टबर्न',
        'नीलडाम',
        'रक्तस्राव'
      ],
      warnings: [
        'May cause stomach bleeding',
        'Avoid if bleeding disorders',
        'Not for children with viral infections',
        'Consult doctor before surgery'
      ],
      warningsNe: [
        'पेट रक्तस्राव हुन सक्छ',
        'रक्तस्राव विकारहरू भए बच्नुहोस्',
        'भाइरल संक्रमण भएका बालबालिकाका लागि होइन',
        'सर्जरी अघि डाक्टरसँग परामर्श गर्नुहोस्'
      ],
      photo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    }
  ];

  // Mock AI response - In production, this would call Gemini Vision API
  const identifyMedicineWithAI = async (imageData: string): Promise<MedicineInfo> => {
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate AI identification by randomly selecting from the database
    const randomIndex = Math.floor(Math.random() * mockMedicineDatabase.length);
    return mockMedicineDatabase[randomIndex];
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as string;
      setSelectedImage(imageData);
      
      setLoading(true);
      try {
        const info = await identifyMedicineWithAI(imageData);
        setResult(info);
      } catch (error) {
        console.error('Error identifying medicine:', error);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium">{t.upload}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
            <Camera className="w-12 h-12 text-gray-400 mb-3" />
            <span className="text-gray-600 font-medium">{t.takePicture}</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {selectedImage && (
          <div className="mt-4">
            <img
              src={selectedImage}
              alt="Selected medicine"
              className="w-full max-h-64 object-contain rounded-lg"
            />
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 p-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-700">{t.analyzing}</span>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">{t.disclaimer}</p>
        </div>
      </div>

      {result && !loading && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={result.photo}
                alt={language === 'en' ? result.name : result.nameNe}
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {language === 'en' ? result.name : result.nameNe}
                </h3>
                <p className="text-gray-600 mt-1">
                  {t.genericName}: {language === 'en' ? result.genericName : result.genericNameNe}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💊</span> {t.uses}
            </h4>
            <ul className="space-y-2">
              {(language === 'en' ? result.uses : result.usesNe).map((use, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{use}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">📋</span> {t.dosage}
            </h4>
            <p className="text-gray-700">{language === 'en' ? result.dosage : result.dosageNe}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span> {t.sideEffects}
            </h4>
            <ul className="space-y-2">
              {(language === 'en' ? result.sideEffects : result.sideEffectsNe).map((effect, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-gray-700">{effect}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🚨</span> {t.warnings}
            </h4>
            <ul className="space-y-2">
              {(language === 'en' ? result.warnings : result.warningsNe).map((warning, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-600 mt-1">•</span>
                  <span className="text-red-900">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
