import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { SectionTitle } from "./SectionTitle";
import { Sparkles, Heart, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20
    }
  }
};

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  Camera: Camera,
};

const servicesData = (t) => [
  {
    id: 1,
    title: t('services.brandShooting.title'),
    description: t('services.brandShooting.description'),
    icon: "Sparkles"
  },
  {
    id: 2,
    title: t('services.wedding.title'),
    description: t('services.wedding.description'),
    icon: "Heart"
  },
  {
    id: 3,
    title: t('services.personal.title'),
    description: t('services.personal.description'),
    icon: "Camera"
  }
];

export const Services = () => {
  const { t } = useTranslation();
  const services = servicesData(t);

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title={t('services.title')} subtitle={t('services.subtitle')} />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="will-change-transform"
              >
                <Card className="h-full bg-background border-border/50 hover:border-foreground/20 transition-colors duration-300 rounded-none shadow-sm hover:shadow-md">
                  <CardHeader className="text-center pb-4 pt-10">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-muted mb-4 rounded-full text-foreground/70">
                      {Icon && <Icon size={24} strokeWidth={1.5} />}
                    </div>
                    <CardTitle className="font-heading text-2xl font-normal">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-10 px-8">
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
