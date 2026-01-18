import React, { useState } from 'react';
import { Search, AlertCircle, Loader2, X, UserRound, Phone, MapPin, Star } from 'lucide-react';

interface SymptomCheckerProps {
  language: 'en' | 'ne';
}

interface Doctor {
  name: string;
  nameNe: string;
  specialty: string;
  specialtyNe: string;
  hospital: string;
  hospitalNe: string;
  experience: string;
  experienceNe: string;
  phone: string;
  rating: number;
}

interface Disease {
  name: string;
  nameNe: string;
  probability: number;
  description: string;
  descriptionNe: string;
  recommendations: string[];
  recommendationsNe: string[];
  relatedDoctors: Doctor[];
}

interface Symptom {
  id: string;
  name: string;
  nameNe: string;
  category: string;
  categoryNe: string;
}

export function SymptomChecker({ language }: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<Disease[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    en: {
      title: 'AI Symptom Checker',
      subtitle: 'Select your symptoms to get AI-powered disease predictions',
      selectSymptoms: 'Select Your Symptoms',
      selectedSymptoms: 'Selected Symptoms',
      search: 'Search symptoms...',
      analyze: 'Analyze Symptoms',
      results: 'Possible Conditions',
      probability: 'Probability',
      recommendations: 'Recommendations',
      consultDoctors: 'Recommended Doctors',
      disclaimer: 'This is not a substitute for professional medical advice. Please consult a healthcare provider.',
      analyzing: 'Analyzing your symptoms...',
      noSymptoms: 'Please select at least one symptom',
      experience: 'Experience',
      rating: 'Rating',
      contact: 'Contact',
      general: 'General',
      respiratory: 'Respiratory',
      digestive: 'Digestive',
      neurological: 'Neurological',
      musculoskeletal: 'Musculoskeletal',
      skin: 'Skin',
      cardiovascular: 'Cardiovascular',
      other: 'Other'
    },
    ne: {
      title: 'एआई लक्षण परीक्षक',
      subtitle: 'एआई-संचालित रोग भविष्यवाणी प्राप्त गर्न आफ्नो लक्षणहरू चयन गर्नुहोस्',
      selectSymptoms: 'आफ्नो लक्षणहरू चयन गर्नुहोस्',
      selectedSymptoms: 'चयन गरिएका लक्षणहरू',
      search: 'लक्षणहरू खोज्नुहोस्...',
      analyze: 'लक्षण विश्लेषण गर्नुहोस्',
      results: 'सम्भावित रोगहरू',
      probability: 'सम्भावना',
      recommendations: 'सिफारिसहरू',
      consultDoctors: 'सिफारिस गरिएका डाक्टरहरू',
      disclaimer: 'यो व्यावसायिक चिकित्सा सल्लाहको विकल्प होइन। कृपया स्वास्थ्य सेवा प्रदायकसँग परामर्श गर्नुहोस्।',
      analyzing: 'तपाईंको लक्षणहरू विश्लेषण गर्दै...',
      noSymptoms: 'कृपया कम्तिमा एउटा लक्षण चयन गर्नुहोस्',
      experience: 'अनुभव',
      rating: 'मूल्याङ्कन',
      contact: 'सम्पर्क',
      general: 'सामान्य',
      respiratory: 'श्वासप्रश्वास',
      digestive: 'पाचन',
      neurological: 'न्यूरोलोजिकल',
      musculoskeletal: 'मस्कुलोस्केलेटल',
      skin: 'छाला',
      cardiovascular: 'हृदय',
      other: 'अन्य'
    }
  };

  const t = translations[language];

  // Comprehensive list of symptoms
  const allSymptoms: Symptom[] = [
    // General Symptoms
    { id: 'fever', name: 'Fever', nameNe: 'ज्वरो', category: 'general', categoryNe: 'सामान्य' },
    { id: 'fatigue', name: 'Fatigue', nameNe: 'थकान', category: 'general', categoryNe: 'सामान्य' },
    { id: 'weakness', name: 'Weakness', nameNe: 'कमजोरी', category: 'general', categoryNe: 'सामान्य' },
    { id: 'chills', name: 'Chills', nameNe: 'चिसो लाग्ने', category: 'general', categoryNe: 'सामान्य' },
    { id: 'sweating', name: 'Night Sweats', nameNe: 'रातमा पसिना', category: 'general', categoryNe: 'सामान्य' },
    { id: 'weight-loss', name: 'Weight Loss', nameNe: 'तौल घट्ने', category: 'general', categoryNe: 'सामान्य' },
    { id: 'weight-gain', name: 'Weight Gain', nameNe: 'तौल बढ्ने', category: 'general', categoryNe: 'सामान्य' },
    { id: 'loss-appetite', name: 'Loss of Appetite', nameNe: 'भोक नलाग्ने', category: 'general', categoryNe: 'सामान्य' },

    // Respiratory Symptoms
    { id: 'cough', name: 'Cough', nameNe: 'खोकी', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'sore-throat', name: 'Sore Throat', nameNe: 'घाँटी दुख्ने', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'runny-nose', name: 'Runny Nose', nameNe: 'नाक बग्ने', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'nasal-congestion', name: 'Nasal Congestion', nameNe: 'नाक बन्द', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'shortness-breath', name: 'Shortness of Breath', nameNe: 'सास फेर्न गाह्रो', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'chest-pain', name: 'Chest Pain', nameNe: 'छाती दुख्ने', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'wheezing', name: 'Wheezing', nameNe: 'सास फेर्दा आवाज', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },
    { id: 'sneezing', name: 'Sneezing', nameNe: 'हाच्छ्युँ', category: 'respiratory', categoryNe: 'श्वासप्रश्वास' },

    // Digestive Symptoms
    { id: 'nausea', name: 'Nausea', nameNe: 'वाकवाकी', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'vomiting', name: 'Vomiting', nameNe: 'बान्ता', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'diarrhea', name: 'Diarrhea', nameNe: 'झाडापखाला', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'constipation', name: 'Constipation', nameNe: 'कब्जियत', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'abdominal-pain', name: 'Abdominal Pain', nameNe: 'पेट दुख्ने', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'bloating', name: 'Bloating', nameNe: 'पेट फुल्ने', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'heartburn', name: 'Heartburn', nameNe: 'छाती पोल्ने', category: 'digestive', categoryNe: 'पाचन' },
    { id: 'indigestion', name: 'Indigestion', nameNe: 'बदहजमी', category: 'digestive', categoryNe: 'पाचन' },

    // Neurological Symptoms
    { id: 'headache', name: 'Headache', nameNe: 'टाउको दुख्ने', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'dizziness', name: 'Dizziness', nameNe: 'चक्कर लाग्ने', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'confusion', name: 'Confusion', nameNe: 'भ्रम', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'memory-loss', name: 'Memory Loss', nameNe: 'सम्झना गुम्ने', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'numbness', name: 'Numbness', nameNe: 'सुन्निने', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'tingling', name: 'Tingling', nameNe: 'झिलमिली', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'seizures', name: 'Seizures', nameNe: 'दौरा', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },
    { id: 'blurred-vision', name: 'Blurred Vision', nameNe: 'धमिलो देखिने', category: 'neurological', categoryNe: 'न्यूरोलोजिकल' },

    // Musculoskeletal Symptoms
    { id: 'joint-pain', name: 'Joint Pain', nameNe: 'जोर्नी दुख्ने', category: 'musculoskeletal', categoryNe: 'मस्कुलोस्केलेटल' },
    { id: 'muscle-pain', name: 'Muscle Pain', nameNe: 'मांसपेशी दुख्ने', category: 'musculoskeletal', categoryNe: 'मस्कुलोस्केलेटल' },
    { id: 'back-pain', name: 'Back Pain', nameNe: 'ढाड दुख्ने', category: 'musculoskeletal', categoryNe: 'मस्कुलोस्केलेटल' },
    { id: 'stiffness', name: 'Stiffness', nameNe: 'कडा हुने', category: 'musculoskeletal', categoryNe: 'मस्कुलोस्केलेटल' },
    { id: 'swelling', name: 'Swelling', nameNe: 'सुन्निने', category: 'musculoskeletal', categoryNe: 'मस्कुलोस्केलेटल' },

    // Skin Symptoms
    { id: 'rash', name: 'Rash', nameNe: 'दाग', category: 'skin', categoryNe: 'छाला' },
    { id: 'itching', name: 'Itching', nameNe: 'चिलाउने', category: 'skin', categoryNe: 'छाला' },
    { id: 'dry-skin', name: 'Dry Skin', nameNe: 'सुख्खा छाला', category: 'skin', categoryNe: 'छाला' },
    { id: 'hives', name: 'Hives', nameNe: 'पित्त उठ्ने', category: 'skin', categoryNe: 'छाला' },
    { id: 'bruising', name: 'Easy Bruising', nameNe: 'सजिलै चोट', category: 'skin', categoryNe: 'छाला' },

    // Cardiovascular Symptoms
    { id: 'palpitations', name: 'Heart Palpitations', nameNe: 'मुटु धड्किने', category: 'cardiovascular', categoryNe: 'हृदय' },
    { id: 'irregular-heartbeat', name: 'Irregular Heartbeat', nameNe: 'अनियमित मुटुको धड्कन', category: 'cardiovascular', categoryNe: 'हृदय' },
    { id: 'high-blood-pressure', name: 'High Blood Pressure', nameNe: 'उच्च रक्तचाप', category: 'cardiovascular', categoryNe: 'हृदय' },
    { id: 'low-blood-pressure', name: 'Low Blood Pressure', nameNe: 'कम रक्तचाप', category: 'cardiovascular', categoryNe: 'हृदय' },

    // Other Symptoms
    { id: 'frequent-urination', name: 'Frequent Urination', nameNe: 'बारम्बार पिसाब', category: 'other', categoryNe: 'अन्य' },
    { id: 'painful-urination', name: 'Painful Urination', nameNe: 'पिसाब गर्दा दुख्ने', category: 'other', categoryNe: 'अन्य' },
    { id: 'blood-urine', name: 'Blood in Urine', nameNe: 'पिसाबमा रगत', category: 'other', categoryNe: 'अन्य' },
    { id: 'difficulty-sleeping', name: 'Difficulty Sleeping', nameNe: 'निद्रा नलाग्ने', category: 'other', categoryNe: 'अन्य' },
    { id: 'anxiety', name: 'Anxiety', nameNe: 'चिन्ता', category: 'other', categoryNe: 'अन्य' },
    { id: 'depression', name: 'Depression', nameNe: 'डिप्रेसन', category: 'other', categoryNe: 'अन्य' },
    { id: 'ear-pain', name: 'Ear Pain', nameNe: 'कान दुख्ने', category: 'other', categoryNe: 'अन्य' },
    { id: 'eye-redness', name: 'Eye Redness', nameNe: 'आँखा रातो', category: 'other', categoryNe: 'अन्य' }
  ];

  const filteredSymptoms = allSymptoms.filter(symptom => {
    const searchLower = searchQuery.toLowerCase();
    return (
      symptom.name.toLowerCase().includes(searchLower) ||
      symptom.nameNe.includes(searchQuery) ||
      symptom.category.toLowerCase().includes(searchLower)
    );
  });

  // Group symptoms by category
  const groupedSymptoms = filteredSymptoms.reduce((acc, symptom) => {
    const category = language === 'en' ? symptom.category : symptom.categoryNe;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(symptom);
    return acc;
  }, {} as Record<string, Symptom[]>);

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  // Mock AI response - In production, this would call Gemini API
  const analyzeSymptomsWithAI = async (symptomIds: string[]): Promise<Disease[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock database of diseases with related doctors
    const diseaseDatabase: Disease[] = [
      {
        name: 'Common Cold',
        nameNe: 'सामान्य रुघाखोकी',
        probability: 85,
        description: 'A viral infection of the upper respiratory tract. Usually resolves on its own within 7-10 days.',
        descriptionNe: 'माथिल्लो श्वासप्रश्वास पथको भाइरल संक्रमण। सामान्यतया ७-१० दिनमा आफै निको हुन्छ।',
        recommendations: [
          'Get plenty of rest',
          'Stay hydrated with warm fluids',
          'Use over-the-counter cold medications',
          'Gargle with salt water for sore throat'
        ],
        recommendationsNe: [
          'धेरै आराम गर्नुहोस्',
          'न्यानो तरल पदार्थले हाइड्रेटेड रहनुहोस्',
          'ओभर-द-काउन्टर चिसो औषधिहरू प्रयोग गर्नुहोस्',
          'घाँटी दुखाइको लागि नुन पानीले गार्गल गर्नुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Ramesh Sharma',
            nameNe: 'डा. रमेश शर्मा',
            specialty: 'General Physician',
            specialtyNe: 'सामान्य चिकित्सक',
            hospital: 'Grande Hospital, Dhapasi',
            hospitalNe: 'ग्रान्डे अस्पताल, ढापासी',
            experience: '15 years',
            experienceNe: '१५ वर्ष',
            phone: '+977-1-5159266',
            rating: 4.7
          },
          {
            name: 'Dr. Sita Poudel',
            nameNe: 'डा. सीता पौडेल',
            specialty: 'Family Medicine',
            specialtyNe: 'पारिवारिक चिकित्सा',
            hospital: 'Norvic Hospital, Thapathali',
            hospitalNe: 'नर्भिक अस्पताल, थापाथली',
            experience: '12 years',
            experienceNe: '१२ वर्ष',
            phone: '+977-1-4258554',
            rating: 4.8
          }
        ]
      },
      {
        name: 'Seasonal Flu (Influenza)',
        nameNe: 'मौसमी फ्लू (इन्फ्लुएन्जा)',
        probability: 70,
        description: 'Influenza is a viral infection that attacks the respiratory system. Can be more severe than a common cold with sudden onset of symptoms.',
        descriptionNe: 'इन्फ्लुएन्जा एक भाइरल संक्रमण हो जसले श्वासप्रश्वास प्रणालीमा आक्रमण गर्छ। लक्षणहरूको अचानक सुरुवातसँग सामान्य रुघाखोकी भन्दा गम्भीर हुन सक्छ।',
        recommendations: [
          'Consult a doctor for antiviral medication within 48 hours',
          'Rest and drink plenty of fluids',
          'Monitor temperature regularly',
          'Isolate to prevent spread to others',
          'Take prescribed medications as directed'
        ],
        recommendationsNe: [
          '४८ घण्टा भित्र एन्टिभाइरल औषधिको लागि डाक्टरसँग परामर्श गर्नुहोस्',
          'आराम गर्नुहोस् र धेरै तरल पदार्थ पिउनुहोस्',
          'नियमित रूपमा तापक्रम निगरानी गर्नुहोस्',
          'अरूलाई फैलावट रोक्न अलग रहनुहोस्',
          'निर्देशन अनुसार निर्धारित औषधिहरू लिनुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Prakash Thapa',
            nameNe: 'डा. प्रकाश थापा',
            specialty: 'Internal Medicine',
            specialtyNe: 'आन्तरिक चिकित्सा',
            hospital: 'TUTH, Maharajgunj',
            hospitalNe: 'त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल, महाराजगञ्ज',
            experience: '20 years',
            experienceNe: '२० वर्ष',
            phone: '+977-1-4412303',
            rating: 4.9
          },
          {
            name: 'Dr. Anjali Singh',
            nameNe: 'डा. अञ्जली सिंह',
            specialty: 'Infectious Disease',
            specialtyNe: 'संक्रामक रोग',
            hospital: 'Grande Hospital, Dhapasi',
            hospitalNe: 'ग्रान्डे अस्पताल, ढापासी',
            experience: '10 years',
            experienceNe: '१० वर्ष',
            phone: '+977-1-5159266',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Allergic Rhinitis',
        nameNe: 'एलर्जिक राइनाइटिस',
        probability: 65,
        description: 'Inflammation of the nasal passages caused by allergies. Common triggers include pollen, dust mites, pet dander, and mold.',
        descriptionNe: 'एलर्जीको कारणले नाक मार्गको सूजन। सामान्य ट्रिगरहरूमा परागकण, धुलो माइट, पाल्तु जनावरको फर र ढुसी समावेश छ।',
        recommendations: [
          'Identify and avoid known allergens',
          'Use antihistamine medications',
          'Keep windows closed during high pollen days',
          'Use air purifiers at home',
          'Consider allergy testing'
        ],
        recommendationsNe: [
          'ज्ञात एलर्जी पहिचान गर्नुहोस् र बच्नुहोस्',
          'एन्टिहिस्टामाइन औषधि प्रयोग गर्नुहोस्',
          'उच्च परागकणको दिनहरूमा झ्यालहरू बन्द राख्नुहोस्',
          'घरमा एयर प्युरिफायर प्रयोग गर्नुहोस्',
          'एलर्जी परीक्षण विचार गर्नुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Binod Adhikari',
            nameNe: 'डा. बिनोद अधिकारी',
            specialty: 'Allergist/Immunologist',
            specialtyNe: 'एलर्जी विशेषज्ञ',
            hospital: 'Patan Hospital, Lagankhel',
            hospitalNe: 'पाटन अस्पताल, लगनखेल',
            experience: '18 years',
            experienceNe: '१८ वर्ष',
            phone: '+977-1-5522278',
            rating: 4.8
          },
          {
            name: 'Dr. Maya Gurung',
            nameNe: 'डा. माया गुरुङ',
            specialty: 'ENT Specialist',
            specialtyNe: 'कान, नाक, घाँटी विशेषज्ञ',
            hospital: 'Norvic Hospital, Thapathali',
            hospitalNe: 'नर्भिक अस्पताल, थापाथली',
            experience: '14 years',
            experienceNe: '१४ वर्ष',
            phone: '+977-1-4258554',
            rating: 4.7
          }
        ]
      },
      {
        name: 'Gastroenteritis',
        nameNe: 'ग्यास्ट्रोएन्टेराइटिस',
        probability: 75,
        description: 'Inflammation of the digestive tract causing diarrhea, vomiting, and abdominal pain. Usually caused by viral or bacterial infection.',
        descriptionNe: 'पाचन तन्त्रको सूजनले झाडापखाला, बान्ता र पेट दुखाइ निम्त्याउँछ। सामान्यतया भाइरल वा ब्याक्टेरियल संक्रमणको कारणले हुन्छ।',
        recommendations: [
          'Stay well hydrated with ORS',
          'Eat bland, easy-to-digest foods',
          'Avoid dairy products temporarily',
          'Practice good hand hygiene',
          'Seek medical help if symptoms persist beyond 3 days'
        ],
        recommendationsNe: [
          'ORS ले राम्रोसँग हाइड्रेटेड रहनुहोस्',
          'नरम, सजिलै पच्ने खाना खानुहोस्',
          'अस्थायी रूपमा दुग्ध उत्पादनहरूबाट बच्नुहोस्',
          'राम्रो हात सरसफाइ अभ्यास गर्नुहोस्',
          'लक्षणहरू ३ दिन भन्दा बढी रहे चिकित्सा सहायता लिनुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Suresh Regmi',
            nameNe: 'डा. सुरेश रेग्मी',
            specialty: 'Gastroenterologist',
            specialtyNe: 'ग्यास्ट्रोएन्टेरोलोजिस्ट',
            hospital: 'Grande Hospital, Dhapasi',
            hospitalNe: 'ग्रान्डे अस्पताल, ढापासी',
            experience: '16 years',
            experienceNe: '१६ वर्ष',
            phone: '+977-1-5159266',
            rating: 4.8
          }
        ]
      },
      {
        name: 'Migraine',
        nameNe: 'माइग्रेन',
        probability: 80,
        description: 'A neurological condition characterized by intense, throbbing headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.',
        descriptionNe: 'एक न्यूरोलोजिकल अवस्था जसमा तीव्र, धड्किने टाउको दुखाइ हुन्छ जुन प्राय: वाकवाकी, बान्ता र प्रकाश र आवाजप्रति संवेदनशीलताको साथ हुन्छ।',
        recommendations: [
          'Rest in a quiet, dark room',
          'Take prescribed migraine medications early',
          'Apply cold compress to head',
          'Identify and avoid triggers',
          'Maintain regular sleep schedule',
          'Stay hydrated'
        ],
        recommendationsNe: [
          'शान्त, अँध्यारो कोठामा आराम गर्नुहोस्',
          'निर्धारित माइग्रेन औषधि चाँडै लिनुहोस्',
          'टाउकोमा चिसो कम्प्रेस लगाउनुहोस्',
          'ट्रिगर पहिचान गर्नुहोस् र बच्नुहोस्',
          'नियमित निद्रा तालिका कायम राख्नुहोस्',
          'हाइड्रेटेड रहनुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Rajesh Bajracharya',
            nameNe: 'डा. राजेश बज्राचार्य',
            specialty: 'Neurologist',
            specialtyNe: 'न्यूरोलोजिस्ट',
            hospital: 'TUTH, Maharajgunj',
            hospitalNe: 'त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल, महाराजगञ्ज',
            experience: '22 years',
            experienceNe: '२२ वर्ष',
            phone: '+977-1-4412303',
            rating: 4.9
          },
          {
            name: 'Dr. Kalpana Shrestha',
            nameNe: 'डा. कल्पना श्रेष्ठ',
            specialty: 'Neurologist',
            specialtyNe: 'न्यूरोलोजिस्ट',
            hospital: 'Norvic Hospital, Thapathali',
            hospitalNe: 'नर्भिक अस्पताल, थापाथली',
            experience: '15 years',
            experienceNe: '१५ वर्ष',
            phone: '+977-1-4258554',
            rating: 4.7
          }
        ]
      },
      {
        name: 'Urinary Tract Infection (UTI)',
        nameNe: 'मूत्र मार्ग संक्रमण',
        probability: 85,
        description: 'Bacterial infection affecting the urinary system. More common in women. Requires prompt antibiotic treatment.',
        descriptionNe: 'मूत्र प्रणालीलाई असर गर्ने ब्याक्टेरियल संक्रमण। महिलाहरूमा बढी सामान्य। तुरुन्त एन्टिबायोटिक उपचार आवश्यक छ।',
        recommendations: [
          'Consult doctor for antibiotic prescription',
          'Drink plenty of water',
          'Urinate frequently',
          'Avoid holding urine',
          'Maintain good hygiene',
          'Complete full course of antibiotics'
        ],
        recommendationsNe: [
          'एन्टिबायोटिक प्रिस्क्रिप्शनको लागि डाक्टरसँग परामर्श गर्नुहोस्',
          'धेरै पानी पिउनुहोस्',
          'बारम्बार पिसाब गर्नुहोस्',
          'पिसाब रोक्न बच्नुहोस्',
          'राम्रो सरसफाइ कायम राख्नुहोस्',
          'एन्टिबायोटिकको पूर्ण कोर्स पूरा गर्नुहोस्'
        ],
        relatedDoctors: [
          {
            name: 'Dr. Nirmala Rai',
            nameNe: 'डा. निर्मला राई',
            specialty: 'Urologist',
            specialtyNe: 'युरोलोजिस्ट',
            hospital: 'Grande Hospital, Dhapasi',
            hospitalNe: 'ग्रान्डे अस्पताल, ढापासी',
            experience: '13 years',
            experienceNe: '१३ वर्ष',
            phone: '+977-1-5159266',
            rating: 4.6
          },
          {
            name: 'Dr. Krishna Karki',
            nameNe: 'डा. कृष्ण कार्की',
            specialty: 'General Physician',
            specialtyNe: 'सामान्य चिकित्सक',
            hospital: 'Patan Hospital, Lagankhel',
            hospitalNe: 'पाटन अस्पताल, लगनखेल',
            experience: '17 years',
            experienceNe: '१७ वर्ष',
            phone: '+977-1-5522278',
            rating: 4.7
          }
        ]
      }
    ];

    // Simple symptom matching logic (in production, use ML model)
    const matchingDiseases = diseaseDatabase.filter(disease => {
      // Adjust probabilities based on symptom matches
      return Math.random() > 0.3; // Mock filtering
    });

    return matchingDiseases.sort((a, b) => b.probability - a.probability).slice(0, 3);
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;

    setLoading(true);
    try {
      const diseases = await analyzeSymptomsWithAI(selectedSymptoms);
      setResults(diseases);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">{t.selectedSymptoms} ({selectedSymptoms.length})</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map(symptomId => {
              const symptom = allSymptoms.find(s => s.id === symptomId);
              if (!symptom) return null;
              return (
                <button
                  key={symptomId}
                  onClick={() => toggleSymptom(symptomId)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all"
                >
                  <span>{language === 'en' ? symptom.name : symptom.nameNe}</span>
                  <X className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Symptom Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">{t.selectSymptoms}</h3>
        
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

        <div className="max-h-96 overflow-y-auto space-y-4">
          {Object.entries(groupedSymptoms).map(([category, symptoms]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-700 mb-2 sticky top-0 bg-white py-2">
                {category}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {symptoms.map(symptom => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language === 'en' ? symptom.name : symptom.nameNe}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || selectedSymptoms.length === 0}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t.analyzing}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t.analyze}
            </>
          )}
        </button>

        <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">{t.disclaimer}</p>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">{t.results}</h3>
          {results.map((disease, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-gray-900">
                  {language === 'en' ? disease.name : disease.nameNe}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">{t.probability}:</div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                    {disease.probability}%
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${disease.probability}%` }}
                />
              </div>

              <p className="text-gray-700">
                {language === 'en' ? disease.description : disease.descriptionNe}
              </p>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">{t.recommendations}:</h5>
                <ul className="space-y-2">
                  {(language === 'en' ? disease.recommendations : disease.recommendationsNe).map(
                    (rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Doctor Recommendations */}
              <div className="border-t border-gray-200 pt-6">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserRound className="w-5 h-5 text-blue-600" />
                  {t.consultDoctors}
                </h5>
                <div className="grid md:grid-cols-2 gap-4">
                  {disease.relatedDoctors.map((doctor, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h6 className="font-bold text-gray-900">
                              {language === 'en' ? doctor.name : doctor.nameNe}
                            </h6>
                            <p className="text-sm text-blue-600 font-medium">
                              {language === 'en' ? doctor.specialty : doctor.specialtyNe}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{doctor.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{language === 'en' ? doctor.hospital : doctor.hospitalNe}</span>
                        </div>

                        <div className="text-sm text-gray-600">
                          {t.experience}: {language === 'en' ? doctor.experience : doctor.experienceNe}
                        </div>

                        <a
                          href={`tel:${doctor.phone}`}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all text-sm justify-center"
                        >
                          <Phone className="w-4 h-4" />
                          {t.contact}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
