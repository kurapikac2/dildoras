import { motion } from "framer-motion";

export const SectionTitle = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-[1px] w-6 md:w-8 bg-foreground/30" />
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-sans">
            {subtitle}
          </span>
          <span className="h-[1px] w-6 md:w-8 bg-foreground/30" />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="text-4xl md:text-5xl font-heading mb-4 text-foreground will-change-transform"
      >
        {title}
      </motion.h2>
    </div>
  );
};
