
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "w-full py-6 px-8 flex items-center justify-between z-10 sticky top-0 backdrop-blur-lg bg-background/80 border-b border-border",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="M12 6v12"></path>
            <path d="M6 12h12"></path>
          </svg>
        </div>
        <h1 className="text-xl font-medium tracking-tight">Budget Planner</h1>
      </div>
    </motion.header>
  );
};

export default Header;
