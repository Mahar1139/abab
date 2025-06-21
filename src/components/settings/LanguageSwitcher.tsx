
'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LanguageSwitcher() {

  return (
    <div className="space-y-2">
        <Label htmlFor="language-select">Language</Label>
        <Select defaultValue="en" disabled>
            <SelectTrigger id="language-select">
            <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi" disabled>Hindi (Coming Soon)</SelectItem>
            </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Full-site language switching is a planned feature.</p>
    </div>
  );
}
