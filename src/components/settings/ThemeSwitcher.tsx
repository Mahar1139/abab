
'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Leaf } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-2">
      <Label>Theme</Label>
      <div className="grid grid-cols-3 gap-2">
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
          variant={theme === 'forest' ? 'default' : 'outline'}
          onClick={() => setTheme('forest')}
          className="w-full"
        >
          <Leaf className="mr-2 h-4 w-4" />
          Forest
        </Button>
      </div>
    </div>
  );
}
