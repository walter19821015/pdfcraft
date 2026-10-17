'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { type Locale, locales, localeConfig, getLocalizedPath } from '@/lib/i18n/config';
import { saveLanguagePreference } from './LanguageSelector';

export interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    saveLanguagePreference(newLocale);
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <footer
      className="w-full border-t border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] py-8"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        {/* Language Switcher */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Globe className="h-4 w-4 text-[hsl(var(--color-muted-foreground))]" />
            <span className="text-sm font-medium text-[hsl(var(--color-foreground))]">
              {t('buttons.selectLanguage')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {locales.map((loc) => {
              const config = localeConfig[loc];
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`
                    px-3 py-1.5 text-sm rounded-full transition-all
                    ${isActive
                      ? 'bg-[hsl(var(--color-primary))] text-white font-medium'
                      : 'bg-[hsl(var(--color-muted))] text-[hsl(var(--color-muted-foreground))] hover:bg-[hsl(var(--color-primary)/0.1)] hover:text-[hsl(var(--color-primary))]'
                    }
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {config.nativeName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
