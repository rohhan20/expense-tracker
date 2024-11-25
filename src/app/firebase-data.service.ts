import { inject, Injectable } from '@angular/core';
import { Expense } from './home/expense';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where 
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Get user-specific expense collection
  private getUserExpensesCollection() {
    const userEmail = this.authService.currentUserSig()?.email;
    return collection(this.firestore, `users/${userEmail}/expenses`);
  }

  getExpenses(): Observable<Expense[]> {
    const expensesCollection = this.getUserExpensesCollection();
    return collectionData(expensesCollection, { idField: 'id' }) as Observable<Expense[]>;
  }

  addExpense(expense: Expense): Observable<string> {
    const expensesCollection = this.getUserExpensesCollection();
    const promise = addDoc(expensesCollection, {
      ...expense,
      date: expense.date.toISOString()
    }).then(docRef => docRef.id);
    return from(promise);
  }

  updateExpense(id: string, expense: Partial<Expense>): Observable<void> {
    const expensesCollection = this.getUserExpensesCollection();
    const docRef = doc(expensesCollection, id);
    const promise = updateDoc(docRef, {
      ...expense,
      date: expense.
    });
    return from(promise);
  }

  deleteExpense(id: string): Observable<void> {
    const expensesCollection = this.getUserExpensesCollection();
    const docRef = doc(expensesCollection, id);
    return from(deleteDoc(docRef));
  }
}
