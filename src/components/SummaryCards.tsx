
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedNumber from './AnimatedNumber';

interface SummaryCardsProps {
  income: number;
  expense: number;
  className?: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expense, className }) => {
  const balance = income - expense;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="summary-card"
      >
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-income-light text-income">
            Income
          </span>
        </div>
        <div className="text-3xl font-semibold tracking-tight overflow-hidden">
          <AnimatedNumber 
            value={income} 
            prefix="$" 
            className="text-income"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Total incoming funds</p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="summary-card"
      >
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-500">
            Expense
          </span>
        </div>
        <div className="text-3xl font-semibold tracking-tight overflow-hidden">
          <AnimatedNumber 
            value={expense} 
            prefix="$" 
            className="text-rose-500"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Total outgoing funds</p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="summary-card"
      >
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500">
            Balance
          </span>
        </div>
        <div className="text-3xl font-semibold tracking-tight overflow-hidden">
          <AnimatedNumber 
            value={balance} 
            prefix="$" 
            className={balance >= 0 ? "text-blue-500" : "text-rose-500"}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Current net balance</p>
      </motion.div>
    </div>
  );
};

export default SummaryCards;
