import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface GoldenButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GoldenButton({
  children,
  to,
  variant = "solid",
  size = "md",
  className = "",
  disabled,
  ...props
}: GoldenButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-xs tracking-wider",
    lg: "px-7 py-3.5 text-sm tracking-wider",
  }[size];

  const variantClasses = {
    solid:
      "bg-gradient-to-r from-[#c99e28] via-[#e5c158] to-[#c99e28] bg-[length:200%_auto] hover:bg-[position:right_center] text-stone-950 font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#ffd866]/40",
    ghost:
      "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 hover:border-[#fbbf24] hover:text-[#fbbf24]",
    outline:
      "bg-transparent hover:bg-(--surface) text-(--gold) border border-(--gold) hover:border-(--gold-bright)",
  }[variant];

  const baseClasses = `relative inline-flex items-center justify-center gap-2 font-semibold uppercase transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--gold) focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none ${sizeClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
