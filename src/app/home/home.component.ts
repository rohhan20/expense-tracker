import {Component, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Expense } from './expense';
import { CommonModule} from '@angular/common';
import { FirebaseDataService } from '../firebase-data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: []
})

export class HomeComponent{
  firebaseDataService: FirebaseDataService = inject(FirebaseDataService);
  recentExpenses: Expense[] = [];
  showExpenseForm=false;
  datasource = new MatTableDataSource<Expense>();
  displayedColumns: string[] = ['date', 'name','category', 'description', 'amount'];

  addForm = new FormGroup({
    date: new FormControl(),
    name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(0),
  });

  constructor() {
    this.recentExpenses = this.firebaseDataService.getAllExpenses();
    this.datasource.data = this.recentExpenses;
  }

  onSubmit() {
    const expense: Expense = {
      id: this.recentExpenses.length,
      date: new Date(this.addForm.value.date),
      name: this.addForm.value.name ?? "",
      category: this.addForm.value.category ?? "",
      description: this.addForm.value.description?? "",
      amount: this.addForm.value.amount ?? 0,
    };

    this.recentExpenses.push({ ...expense}); 
    this.datasource.data = this.recentExpenses;
    this.showExpenseForm = false;
    console.log('Item added');
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
