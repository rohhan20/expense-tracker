export interface Expense {
  id?: string;
  name: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}