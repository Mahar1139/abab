
'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/use-translation';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
        <Label htmlFor="language-select">{t('settings.language.label')}</Label>
        <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi')}>
            <SelectTrigger id="language-select">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('settings.language.english')}</SelectItem>
              <SelectItem value="hi">{t('settings.language.hindi')}</SelectItem>
            </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">{t('settings.language.description')}</p>
    </div>
  );
}
