import React, { useState } from 'react';
import { BookOpen, Heart, Activity, Utensils, Brain, Shield, Search } from 'lucide-react';

interface HealthInfoProps {
  language: 'en' | 'ne';
}

interface Article {
  id: string;
  title: string;
  titleNe: string;
  category: string;
  categoryNe: string;
  summary: string;
  summaryNe: string;
  content: string;
  contentNe: string;
  icon: any;
}

export function HealthInfo({ language }: HealthInfoProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    en: {
      title: 'Health Information & Awareness',
      subtitle: 'Stay informed about health topics and wellness',
      search: 'Search health topics...',
      readMore: 'Read More',
      back: 'Back to Articles',
      all: 'All Topics',
      cardiovascular: 'Heart Health',
      nutrition: 'Nutrition',
      mentalHealth: 'Mental Health',
      prevention: 'Prevention'
    },
    ne: {
      title: 'स्वास्थ्य जानकारी र जागरूकता',
      subtitle: 'स्वास्थ्य विषयहरू र कल्याणको बारेमा जानकार रहनुहोस्',
      search: 'स्वास्थ्य विषयहरू खोज्नुहोस्...',
      readMore: 'थप पढ्नुहोस्',
      back: 'लेखहरूमा फर्कनुहोस्',
      all: 'सबै विषयहरू',
      cardiovascular: 'मुटु स्वास्थ्य',
      nutrition: 'पोषण',
      mentalHealth: 'मानसिक स्वास्थ्य',
      prevention: 'रोकथाम'
    }
  };

  const t = translations[language];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Understanding Heart Health',
      titleNe: 'मुटु स्वास्थ्य बुझ्दै',
      category: 'cardiovascular',
      categoryNe: 'मुटु स्वास्थ्य',
      summary: 'Learn about maintaining a healthy heart and preventing cardiovascular diseases.',
      summaryNe: 'स्वस्थ मुटु कायम राख्ने र हृदय रोगहरू रोक्ने बारे जान्नुहोस्।',
      content: 'Cardiovascular health is crucial for overall wellbeing. Regular exercise, a balanced diet low in saturated fats, managing stress, and avoiding smoking are key factors. Regular check-ups and monitoring blood pressure and cholesterol levels can help prevent heart disease.',
      contentNe: 'हृदय स्वास्थ्य समग्र कल्याणको लागि महत्त्वपूर्ण छ। नियमित व्यायाम, संतृप्त बोसोमा कम सन्तुलित आहार, तनाव व्यवस्थापन, र धुम्रपानबाट बच्नु मुख्य कारकहरू हुन्। नियमित चेकअप र रक्तचाप र कोलेस्ट्रोल स्तर निगरानीले हृदय रोग रोक्न मद्दत गर्न सक्छ।',
      icon: Heart
    },
    {
      id: '2',
      title: 'Balanced Nutrition Guide',
      titleNe: 'सन्तुलित पोषण गाइड',
      category: 'nutrition',
      categoryNe: 'पोषण',
      summary: 'Essential nutrients your body needs and how to get them from food.',
      summaryNe: 'तपाईंको शरीरलाई आवश्यक पोषक तत्वहरू र खानाबाट कसरी प्राप्त गर्ने।',
      content: 'A balanced diet includes proteins, carbohydrates, healthy fats, vitamins, and minerals. Include plenty of fruits, vegetables, whole grains, and lean proteins. Stay hydrated and limit processed foods, sugar, and excessive salt intake.',
      contentNe: 'सन्तुलित आहारमा प्रोटीन, कार्बोहाइड्रेट, स्वस्थ बोसो, भिटामिन र खनिजहरू समावेश हुन्छन्। धेरै फलफूल, तरकारी, सम्पूर्ण अन्न र दुबला प्रोटीन समावेश गर्नुहोस्। हाइड्रेटेड रहनुहोस् र प्रशोधित खाना, चिनी र अत्यधिक नुन सेवन सीमित गर्नुहोस्।',
      icon: Utensils
    },
    {
      id: '3',
      title: 'Mental Wellness Tips',
      titleNe: 'मानसिक कल्याण सुझावहरू',
      category: 'mentalHealth',
      categoryNe: 'मानसिक स्वास्थ्य',
      summary: 'Simple practices to maintain good mental health and reduce stress.',
      summaryNe: 'राम्रो मानसिक स्वास्थ्य कायम राख्न र तनाव कम गर्न सरल अभ्यासहरू।',
      content: 'Mental health is as important as physical health. Practice mindfulness, get adequate sleep, maintain social connections, exercise regularly, and don\'t hesitate to seek professional help when needed. Managing stress through relaxation techniques can significantly improve quality of life.',
      contentNe: 'मानसिक स्वास्थ्य शारीरिक स्वास्थ्य जत्तिकै महत्त्वपूर्ण छ। सजगता अभ्यास गर्नुहोस्, पर्याप्त निद्रा लिनुहोस्, सामाजिक सम्पर्कहरू कायम राख्नुहोस्, नियमित व्यायाम गर्नुहोस्, र आवश्यक परेको बेला व्यावसायिक सहायता लिन नहिचकिचाउनुहोस्। विश्राम प्रविधिहरू मार्फत तनाव व्यवस्थापनले जीवनको गुणस्तरमा उल्लेखनीय सुधार गर्न सक्छ।',
      icon: Brain
    },
    {
      id: '4',
      title: 'Disease Prevention Strategies',
      titleNe: 'रोग रोकथाम रणनीतिहरू',
      category: 'prevention',
      categoryNe: 'रोकथाम',
      summary: 'Proactive steps to prevent common illnesses and stay healthy.',
      summaryNe: 'सामान्य रोगहरू रोक्न र स्वस्थ रहन सक्रिय कदमहरू।',
      content: 'Prevention is better than cure. Regular handwashing, vaccinations, healthy lifestyle choices, regular health screenings, and maintaining good hygiene can prevent many diseases. Stay updated with recommended vaccinations and health check-ups.',
      contentNe: 'रोकथाम उपचार भन्दा राम्रो छ। नियमित हात धुने, खोप, स्वस्थ जीवनशैली छनोट, नियमित स्वास्थ्य जाँच, र राम्रो सरसफाइ कायम राख्दा धेरै रोगहरू रोक्न सकिन्छ। सिफारिस गरिएका खोपहरू र स्वास्थ्य जाँचहरूसँग अद्यावधिक रहनुहोस्।',
      icon: Shield
    },
    {
      id: '5',
      title: 'Exercise and Physical Activity',
      titleNe: 'व्यायाम र शारीरिक गतिविधि',
      category: 'cardiovascular',
      categoryNe: 'मुटु स्वास्थ्य',
      summary: 'Benefits of regular exercise and how to incorporate it into your routine.',
      summaryNe: 'नियमित व्यायामका फाइदाहरू र तपाईंको दिनचर्यामा कसरी समावेश गर्ने।',
      content: 'Regular physical activity strengthens the heart, improves circulation, helps maintain healthy weight, and boosts mental health. Aim for at least 150 minutes of moderate exercise per week. Include both cardio and strength training exercises.',
      contentNe: 'नियमित शारीरिक गतिविधिले मुटुलाई बलियो बनाउँछ, परिसंचरण सुधार गर्छ, स्वस्थ तौल कायम राख्न मद्दत गर्छ, र मानसिक स्वास्थ्य बढाउँछ। प्रति हप्ता कम्तिमा १५० मिनेट मध्यम व्यायामको लक्ष्य राख्नुहोस्। कार्डियो र शक्ति प्रशिक्षण व्यायाम दुवै समावेश गर्नुहोस्।',
      icon: Activity
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleNe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summaryNe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (selectedArticle) {
    const Icon = selectedArticle.icon;
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← {t.back}
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {language === 'en' ? selectedArticle.title : selectedArticle.titleNe}
              </h2>
              <p className="text-gray-600">
                {language === 'en' ? selectedArticle.category : selectedArticle.categoryNe}
              </p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {language === 'en' ? selectedArticle.content : selectedArticle.contentNe}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                💡 {language === 'en' 
                  ? 'This information is for educational purposes. Consult healthcare professionals for medical advice.' 
                  : 'यो जानकारी शैक्षिक उद्देश्यका लागि हो। चिकित्सा सल्लाहको लागि स्वास्थ्य सेवा पेशेवरहरूसँग परामर्श गर्नुहोस्।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => {
          const Icon = article.icon;
          return (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-8 h-8" />
                  <span className="text-sm font-semibold opacity-90">
                    {language === 'en' ? article.category : article.categoryNe}
                  </span>
                </div>
                <h3 className="text-xl font-bold">
                  {language === 'en' ? article.title : article.titleNe}
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  {language === 'en' ? article.summary : article.summaryNe}
                </p>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <BookOpen className="w-4 h-4" />
                  {t.readMore}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
