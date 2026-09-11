import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  yOffset = 40,
}: RevealOnScrollProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
