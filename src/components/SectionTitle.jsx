import { motion } from "framer-motion";

export const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-heading mb-4 text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
