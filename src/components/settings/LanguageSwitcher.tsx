
'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function LanguageSwitcher() {
    const { toast } = useToast();

    const handleLanguageChange = (value: string) => {
        if (value === 'hi') {
            toast({
                title: 'Feature Coming Soon',
                description: 'Hindi language support is not yet implemented.',
            });
        }
    }

  return (
    <div className="space-y-2">
        <Label htmlFor="language-select">Language</Label>
        <Select defaultValue="en" onValueChange={handleLanguageChange}>
            <SelectTrigger id="language-select">
            <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi (Coming Soon)</SelectItem>
            </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Language switching is a planned feature and is not yet functional.</p>
    </div>
  );
}
