import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TelegramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="22" x2="11" y1="2" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

export const Contact = () => {
  const handleOpenInstagram = () => {
    window.open("https://www.instagram.com/feelmyvb?igsh=NHRhMm5ibXc2ZW1x", "_blank", "noopener,noreferrer");
  };

  const handleOpenTelegram = () => {
    window.open("https://t.me/di022ra", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-background border-t border-border/30">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-6 text-foreground tracking-tight">
            Let’s create something beautiful
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
            For bookings, collaborations and personal projects — feel free to reach out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-none font-sans tracking-wide h-14 px-8 bg-foreground text-background hover:bg-foreground/90 group"
              onClick={handleOpenInstagram}
            >
              <InstagramIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Instagram
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-none font-sans tracking-wide h-14 px-8 border-foreground/20 hover:bg-muted group"
              onClick={handleOpenTelegram}
            >
              <TelegramIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Telegram
            </Button>
          </div>

          <p className="text-sm tracking-[0.1em] text-muted-foreground uppercase font-medium">
            Available for selected projects worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
};

