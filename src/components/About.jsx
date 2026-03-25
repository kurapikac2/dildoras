import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-muted relative"
          >
            <img src="/images/photo-about.png" alt="About portrait" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-5xl font-heading mb-8 text-foreground leading-tight">
              Capturing light, <br />
              <span className="italic text-muted-foreground">details & emotion.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                I create soft, aesthetic visuals with focus on light, details and emotion. 
                Working with brands, weddings and personal stories.
              </p>
              <p>
                My approach is rooted in simplicity and elegance, ensuring that every frame 
                feels timeless, authentic, and deeply personal.
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
