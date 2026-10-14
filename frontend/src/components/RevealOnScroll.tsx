import { type ReactNode, useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // On mobile screens: trigger earlier with minimal translate to avoid hitching during fast touch scroll
  const effectiveY = isMobile ? Math.min(10, yOffset) : yOffset;
  const effectiveDuration = isMobile ? 0.35 : 0.8;
  const effectiveMargin = isMobile ? "80px" : "-40px";

  return (
    <motion.div
      initial={{ opacity: 0, y: effectiveY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: effectiveMargin }}
      transition={{
        duration: effectiveDuration,
        delay: isMobile ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
