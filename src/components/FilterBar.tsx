
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Transaction } from '@/types';

interface FilterBarProps {
  onFilterChange: (month: string, year: string) => void;
  transactions: Transaction[];
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, transactions, className }) => {
  const [month, setMonth] = useState('all');
  const [year, setYear] = useState('all');
  const [monthsOptions, setMonthsOptions] = useState<{value: string, label: string}[]>([]);
  const [yearsOptions, setYearsOptions] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    // Extract unique months and years from transactions
    const monthsSet = new Set<number>();
    const yearsSet = new Set<number>();

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      monthsSet.add(date.getMonth());
      yearsSet.add(date.getFullYear());
    });

    // Convert to options format
    const monthOpts = Array.from(monthsSet).sort().map(month => ({
      value: month.toString(),
      label: new Date(2025, month, 1).toLocaleString('en-US', { month: 'long' })
    }));
    
    const yearOpts = Array.from(yearsSet).sort().map(year => ({
      value: year.toString(),
      label: year.toString()
    }));

    setMonthsOptions([{ value: 'all', label: 'All Months' }, ...monthOpts]);
    setYearsOptions([{ value: 'all', label: 'All Years' }, ...yearOpts]);
  }, [transactions]);

  const handleFilter = () => {
    // Convert 'all' back to empty string for the filter logic
    const monthValue = month === 'all' ? '' : month;
    const yearValue = year === 'all' ? '' : year;
    onFilterChange(monthValue, yearValue);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col sm:flex-row gap-4 items-end", className)}
    >
      <div className="flex-1 min-w-[140px]">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Month
        </label>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger>
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent>
            {monthsOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[140px]">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Year
        </label>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            {yearsOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleFilter}
        className="px-6 h-10"
      >
        Filter
      </Button>
    </motion.div>
  );
};

export default FilterBar;
