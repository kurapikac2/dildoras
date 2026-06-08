import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="aspect-[4/5] bg-muted relative will-change-transform ring-1 ring-foreground/10 hover:ring-foreground/20 transition-all duration-300"
          >
            <img src="/images/photo-about.webp" alt="About portrait" className="w-full h-full object-cover" loading="lazy" />
            
            {/* Decorative frame corners */}
            <div className="absolute -top-6 -right-6 w-12 h-12 border border-foreground/20" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 border border-foreground/20" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="flex flex-col justify-center will-change-transform"
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-8 text-foreground leading-tight">
              {t('about.title1')} <br />
              <span className="italic text-muted-foreground">{t('about.title2')}</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>

            <div className="mt-10">
               {/* Decorative signature or minimal element could go here */}
               <div className="w-12 h-[1px] bg-foreground/30"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
