import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ subtitle, title, description, align = "center" }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-10 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">{subtitle}</span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-light tracking-wide mt-2 md:mt-3 text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-3 md:mt-4 max-w-2xl mx-auto text-xs md:text-sm lg:text-base leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-12 md:w-16 h-[2px] bg-primary mt-4 md:mt-6 mx-auto" style={align === "left" ? { marginLeft: 0 } : {}} />
    </motion.div>
  );
};

export default SectionHeading;
