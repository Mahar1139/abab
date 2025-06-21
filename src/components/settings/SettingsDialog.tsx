
'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/hooks/use-translation';

export function SettingsDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-sm">
            <SheetHeader>
                <SheetTitle>{t('settings.title')}</SheetTitle>
                <SheetDescription>
                    {t('settings.description')}
                </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
               <ThemeSwitcher />
               <Separator />
               <LanguageSwitcher />
            </div>
        </SheetContent>
    </Sheet>
  );
}
