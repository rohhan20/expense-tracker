import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'

import { ToolbarModule } from 'primeng/toolbar';
import { Expense } from './expense';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, NgFor, DatePipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: []
})
export class HomeComponent implements OnInit{
  recentExpenses: Expense[] = [
    {
      id: 1,
      description: 'omeletter',
      amount: 40,
      category: 'misc',
      date: new Date(),
    }
  ];

  // constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    // this.expenseService.getRecentExpenses().subscribe(expenses => {
    //   this.recentExpenses = expenses;
    // });
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
}
