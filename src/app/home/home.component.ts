import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'

import { ToolbarModule } from 'primeng/toolbar';
import { Expense } from './expense';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, DatePipe, CurrencyPipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: []
})
export class HomeComponent implements OnInit{

  showExpenseForm=false;
  recentExpenses: Expense[] = [
    {
      id: 1,
      name: 'burger',
      description: 'omeletter',
      amount: 40,
      category: 'misc',
      date: new Date(),
    },

    {
      id: 2,
      name: 'Apple',
      description: 'idk',
      amount: 44,
      category: 'some',
      date: new Date(),
    },

    {
      id: 3,
      name: 'Oranges',
      description: 'some random',
      amount: 50,
      category: 'fruits',
      date: new Date(),
    },

    {
      id: 4,
      name: 'Chicken',
      description: 'Very Tasty',
      amount: 14,
      category: 'Non-Veg',
      date: new Date(),
    },
  ];
  displayedColumns: string[] = ['date', 'name','category', 'description', 'amount'];

  // constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    // this.expenseService.getRecentExpenses().subscribe(expenses => {
    //   this.recentExpenses = expenses;
    // });
  }
  onSubmit() {
    // Handle form submission logic here, e.g., saving the expense data
    // console.log('Expense added:', this.expense);
    this.closeExpenseForm(); // Close the form after submission
  }

  addNewExpense() {
    // Navigate to the add expense page
  }

  viewAllExpenses() {
    // Navigate to the expense list page
  }

  openSettings() {
    // Navigate to the settings page
  }

  openExpenseForm() {
    this.showExpenseForm = true;
  }
  closeExpenseForm() {
    this.showExpenseForm = false;
  }
}
