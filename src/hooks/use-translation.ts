
'use client';

import { useLanguage } from '@/context/LanguageContext';

const translations = {
  en: {
    'settings.title': 'Website Settings',
    'settings.description': 'Customize the appearance and language of the application.',
    'settings.theme.label': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.forest': 'Forest',
    'settings.language.label': 'Language',
    'settings.language.english': 'English',
    'settings.language.hindi': 'Hindi',
    'settings.language.description': 'Full-site language switching is a planned feature.',
  },
  hi: {
    'settings.title': 'वेबसाइट सेटिंग्स',
    'settings.description': 'एप्लिकेशन की उपस्थिति और भाषा को अनुकूलित करें।',
    'settings.theme.label': 'थीम',
    'settings.theme.light': 'लाइट',
    'settings.theme.dark': 'डार्क',
    'settings.theme.forest': 'फ़ॉरेस्ट',
    'settings.language.label': 'भाषा',
    'settings.language.english': 'अंग्रेज़ी',
    'settings.language.hindi': 'हिंदी',
    'settings.language.description': 'पूरी साइट की भाषा बदलना एक नियोजित सुविधा है।',
  },
};

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof translations.en) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return { t };
}
