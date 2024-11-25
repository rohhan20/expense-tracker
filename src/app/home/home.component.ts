import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Expense } from './expense';
import { CommonModule } from '@angular/common';
import { FirebaseDataService } from '../firebase-data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private firebaseDataService = inject(FirebaseDataService);
  authService = inject(AuthService);
  
  showExpenseForm = false;
  isEditing = false;
  currentEditId: string | null = null;
  
  datasource = new MatTableDataSource<Expense>();
  displayedColumns: string[] = ['date', 'name', 'category', 'description', 'amount', 'actions'];

  expenseForm = new FormGroup({
    date: new FormControl(new Date(), [Validators.required]),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required, Validators.min(0)])
  });

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.firebaseDataService.getExpenses().subscribe(expenses => {
      this.datasource.data = expenses;
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expense = this.expenseForm.value as Expense;
      
      if (this.isEditing && this.currentEditId) {
        this.firebaseDataService.updateExpense(this.currentEditId, expense).subscribe({
          next: () => {
            this.resetForm();
            this.loadExpenses();
          }
        });
      } else {
        this.firebaseDataService.addExpense(expense).subscribe({
          next: () => {
            this.resetForm();
            this.loadExpenses();
          }
        });
      }
    }
  }

  editExpense(expense: Expense) {
    this.isEditing = true;
    this.currentEditId = expense.id as string;
    this.showExpenseForm = true;
    this.expenseForm.patchValue({
      date: expense.date,
      name: expense.name as string,
      category: expense.category,
      description: expense.description,
      amount: expense.amount
    });
  }

  deleteExpense(id: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.firebaseDataService.deleteExpense(id).subscribe({
        next: () => this.loadExpenses()
      });
    }
  }

  resetForm() {
    this.expenseForm.reset();
    this.showExpenseForm = false;
    this.isEditing = false;
    this.currentEditId = null;
  }
}
