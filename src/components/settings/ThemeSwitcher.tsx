
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Coffee } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-2">
      <Label>Theme</Label>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={theme === 'light' ? 'default' : 'outline'}
          onClick={() => setTheme('light')}
          className="w-full"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </Button>
        <Button
          variant={theme === 'dark' ? 'default' : 'outline'}
          onClick={() => setTheme('dark')}
          className="w-full"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </Button>
        <Button
          variant={theme === 'sepia' ? 'default' : 'outline'}
          onClick={() => setTheme('sepia')}
          className="w-full col-span-2"
        >
          <Coffee className="mr-2 h-4 w-4" />
          Sepia
        </Button>
      </div>
    </div>
  );
}
