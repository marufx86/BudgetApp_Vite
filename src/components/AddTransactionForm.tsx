
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PlusCircle, DollarSign, ArrowDown } from 'lucide-react';
import { Transaction } from '@/types';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'date'>) => void;
  className?: string;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction, className }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return;
    }
    
    onAddTransaction({
      description: description.trim(),
      amount: parseFloat(amount),
      type
    });
    
    // Reset form
    setDescription('');
    setAmount('');
    setType('expense');
    setIsFormOpen(false);
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0, overflow: 'hidden' },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className={cn("rounded-2xl border bg-card overflow-hidden", className)}>
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PlusCircle size={16} className="text-muted-foreground" />
          <h2 className="text-lg font-medium">Add Transaction</h2>
        </div>
        <Button
          variant={isFormOpen ? "secondary" : "default"}
          onClick={() => setIsFormOpen(!isFormOpen)}
          size="sm"
          className="gap-1"
        >
          {isFormOpen ? (
            <>
              <ArrowDown size={14} />
              Close
            </>
          ) : (
            <>
              <PlusCircle size={14} />
              New
            </>
          )}
        </Button>
      </div>

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate={isFormOpen ? "visible" : "hidden"}
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-2">
              Description
            </label>
            <Input
              id="description"
              placeholder="e.g., Salary, Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-muted-foreground mb-2">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={16} className="text-muted-foreground" />
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-muted-foreground mb-2">
              Type
            </label>
            <Select defaultValue={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full">
              Add Transaction
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransactionForm;
