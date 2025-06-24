
'use client';

import { useLanguage } from '@/context/LanguageContext';

const translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.admissions': 'Admissions',
    'nav.tech': 'Tech Programs',
    'nav.faculty': 'Faculty',
    'nav.schoolLife': 'School Life',
    'nav.events': 'Events Calendar',
    'nav.achievements': 'Achievements',
    'nav.library': 'Library',
    'nav.quiz': 'AI Quiz Challenge',
    'nav.trackPerformance': 'Track Performance',
    
    // Settings
    'settings.title': 'Website Settings',
    'settings.description': 'Customize the appearance and language of the application.',
    'settings.theme.label': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.forest': 'Forest',
    'settings.theme.red': 'Red',
    'settings.language.label': 'Language',
    'settings.language.english': 'English',
    'settings.language.hindi': 'Hindi',
    'settings.language.description': 'Select your preferred language for the interface.',
  },
  hi: {
    // Nav
    'nav.home': 'होम',
    'nav.admissions': 'प्रवेश',
    'nav.tech': 'टेक प्रोग्राम',
    'nav.faculty': 'शिक्षक',
    'nav.schoolLife': 'स्कूल जीवन',
    'nav.events': 'कार्यक्रम कैलेंडर',
    'nav.achievements': 'उपलब्धियां',
    'nav.library': 'पुस्तकालय',
    'nav.quiz': 'एआई प्रश्नोत्तरी',
    'nav.trackPerformance': 'प्रदर्शन ट्रैक करें',

    // Settings
    'settings.title': 'वेबसाइट सेटिंग्स',
    'settings.description': 'एप्लिकेशन की उपस्थिति और भाषा को अनुकूलित करें।',
    'settings.theme.label': 'थीम',
    'settings.theme.light': 'लाइट',
    'settings.theme.dark': 'डार्क',
    'settings.theme.forest': 'फ़ॉरेस्ट',
    'settings.theme.red': 'लाल',
    'settings.language.label': 'भाषा',
    'settings.language.english': 'अंग्रेज़ी',
    'settings.language.hindi': 'हिंदी',
    'settings.language.description': 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें।',
  }
};

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return { t, language };
}
