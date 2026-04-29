import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 md:px-12 bg-background border-t border-border/20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-heading text-lg tracking-wide">
          {t('footer.portfolio')}
        </div>

        <div className="text-sm text-muted-foreground font-light">
          © {currentYear} {t('footer.rights')}
        </div>
        
        <div className="flex gap-6 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">IG</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">TG</a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Mail</a>
        </div>
      </div>
    </footer>
  );
};
