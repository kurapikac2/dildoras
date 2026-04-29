import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm tracking-wide transition-colors hover:opacity-70 text-foreground font-medium"
      aria-label="Switch language"
    >
      {i18n.language === 'ru' ? 'RU | EN' : 'EN | RU'}
    </button>
  );
};
