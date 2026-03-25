import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { servicesData } from "@/data/services";
import { Sparkles, Heart, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  Camera: Camera,
};

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Services" subtitle="Tailored visual solutions for your needs" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
        </div>
      </div>
    </section>
  );
};
