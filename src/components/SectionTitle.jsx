import { motion } from "framer-motion";

export const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="text-4xl md:text-5xl font-heading mb-4 text-foreground will-change-transform"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans will-change-transform"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
