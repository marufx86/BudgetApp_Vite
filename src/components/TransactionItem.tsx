
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  index: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete, index }) => {
  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="transaction-item"
    >
      <td className="py-4 px-4 text-sm">
        <div className="font-medium">{formattedDate}</div>
        <div className="text-xs text-muted-foreground">
          {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="font-medium">{transaction.description}</div>
      </td>
      <td className="py-4 px-4">
        <span 
          className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            transaction.type === 'income' 
              ? "bg-income-light text-income" 
              : "bg-rose-50 text-rose-500"
          )}
        >
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </span>
      </td>
      <td className={cn(
        "py-4 px-4 font-medium tabular-nums",
        transaction.type === 'income' ? "text-income" : "text-rose-500"
      )}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
      </td>
      <td className="py-3 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(transaction.date)}
          className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
        >
          <X size={16} />
          <span className="sr-only">Delete</span>
        </Button>
      </td>
    </motion.tr>
  );
};

export default TransactionItem;
