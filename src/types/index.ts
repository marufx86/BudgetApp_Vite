
export interface Transaction {
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}
