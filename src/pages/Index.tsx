import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import FilterBar from '@/components/FilterBar';
import TransactionList from '@/components/TransactionList';
import AddTransactionForm from '@/components/AddTransactionForm';
import { PlusIcon } from 'lucide-react';
import { Transaction } from '@/types';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        setTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error parsing transactions from localStorage:', error);
        toast.error('Failed to load saved transactions');
      }
    }
  }, []);

  useEffect(() => {
    const filtered = transactions.filter(tx => {
      const date = new Date(tx.date);
      return (selectedYear === "" || date.getFullYear().toString() === selectedYear) &&
             (selectedMonth === "" || date.getMonth().toString() === selectedMonth);
    });
    
    setFilteredTransactions(filtered);
    
    let income = 0, expense = 0;
    filtered.forEach(tx => {
      if (tx.type === 'income') income += tx.amount;
      else expense += tx.amount;
    });
    
    setTotalIncome(income);
    setTotalExpense(expense);
  }, [transactions, selectedMonth, selectedYear]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTx: Omit<Transaction, 'date'>) => {
    const transaction: Transaction = {
      ...newTx,
      date: new Date().toISOString()
    };
    
    setTransactions(prev => [transaction, ...prev]);
    toast.success(`${newTx.type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  };

  const handleDeleteTransaction = (date: string) => {
    setTransactions(prev => prev.filter(tx => tx.date !== date));
    toast.success('Transaction deleted');
  };

  const handleFilterChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <SummaryCards 
            income={totalIncome} 
            expense={totalExpense}
          />
          
          <FilterBar 
            transactions={transactions}
            onFilterChange={handleFilterChange}
          />
          
          <TransactionList 
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
          />
          
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </div>
      </main>
      
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="add-transaction-button fixed bottom-8 right-8 md:hidden z-10"
        onClick={() => {
          const form = document.getElementById('add-transaction-form');
          if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <PlusIcon size={24} />
      </motion.button>
    </div>
  );
};

export default Index;
