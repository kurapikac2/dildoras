export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 md:px-12 bg-background border-t border-border/20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-heading text-lg tracking-wide">
          Portfolio.
        </div>
        
        <div className="text-sm text-muted-foreground font-light">
          © {currentYear} All rights reserved.
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
