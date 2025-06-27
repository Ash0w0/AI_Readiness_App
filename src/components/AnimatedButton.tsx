import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
  glowing?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  glowing = true // AUTO GLOW by default for buttons
}: AnimatedButtonProps) {
  const baseClasses = 'font-medium rounded-2xl transition-all duration-200 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl dark:shadow-purple-500/25 light:shadow-purple-500/30',
    secondary: 'bg-white/10 dark:bg-white/10 light:bg-white/20 border border-white/20 dark:border-white/20 light:border-white/30 text-gray-200 dark:text-gray-200 light:text-gray-700 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-white/30 backdrop-blur-sm',
    ghost: 'text-gray-300 dark:text-gray-300 light:text-gray-600 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-white/20 border border-transparent hover:border-white/10 dark:hover:border-white/10 light:hover:border-white/30',
    highlight: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl dark:shadow-emerald-500/25 light:shadow-emerald-500/30'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${glowing && !disabled && !loading ? 'glow-border' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative flex items-center justify-center gap-2 z-10">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </span>
    </motion.button>
  );
}