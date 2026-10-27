import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  className = '',
  icon,
}) => {
  const variantStyles = {
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    outline: 'bg-transparent text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    xs: 'text-[10px] px-1.5 py-0.5 rounded',
    sm: 'text-xs px-2.5 py-1 rounded-md',
    md: 'text-sm px-3 py-1.5 rounded-lg',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
