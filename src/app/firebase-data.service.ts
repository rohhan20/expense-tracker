import { Injectable } from '@angular/core';
import { Expense } from './home/expense';
import {v4 as uuidv4} from 'uuid';


@Injectable({
  providedIn: 'root'
})

export class FirebaseDataService {
  protected expenses: Expense[] =[
    {
      id: 0,
      name: 'burger',
      description: 'omeletter',
      amount: 40,
      category: 'misc',
      date: new Date(),
    },
    {
      id: 1,
      name: 'Apple',
      description: 'idk',
      amount: 44,
      category: 'some',
      date: new Date(),
    },
    {
      id: 2,
      name: 'Oranges',
      description: 'some random',
      amount: 50,
      category: 'fruits',
      date: new Date(),
    },
    {
      id: 3,
      name: 'Chicken',
      description: 'Very Tasty',
      amount: 14,
      category: 'Non-Veg',
      date: new Date(),
    },
  ];

  constructor() { }

  getAllExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense): void{
    this.expenses.push(expense);
  }

  deleteExpense(id: number): void {

  }
}
