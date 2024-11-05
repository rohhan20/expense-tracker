import { Injectable } from '@angular/core';
import { Expense } from './home/expense';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor() { }
  protected expenses: Expense[] = [];

  getAllExpenses(){
    return this.expenses;
  }

  addExpense(id: Number){

  }

  removeExpense(id: Number) {
    
  }
}
