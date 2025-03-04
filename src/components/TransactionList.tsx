
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import TransactionItem from './TransactionItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  className?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDelete,
  className 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("rounded-2xl border bg-card overflow-hidden", className)}
    >
      <div className="px-6 py-4 border-b flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <Pencil size={16} className="text-muted-foreground" />
          <h2 className="text-lg font-medium">Transactions</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {transactions.length} {transactions.length === 1 ? 'entry' : 'entries'}
        </div>
      </div>

      <ScrollArea className="h-[400px] w-full">
        {transactions.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Type</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Amount</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {transactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction.date}
                    transaction={transaction}
                    onDelete={onDelete}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] px-4 py-12 text-center">
            <div className="rounded-full bg-muted flex items-center justify-center h-12 w-12 mb-4">
              <Pencil size={20} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No transactions yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Add your first transaction using the form below to start tracking your finances.
            </p>
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};

export default TransactionList;
