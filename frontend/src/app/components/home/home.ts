import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatAnchor, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  private customerService = inject(CustomerService);
  private router = inject(Router);

  // 👇 Make everything reactive
  currentCustomer$!: Observable<Customer | null>;
  taskList$!: Observable<{ id: number; name: string }[]>;
  task = '';

  constructor() {
    // Whenever the current customer changes, re-fetch their tasks
    this.currentCustomer$ = this.customerService.currentCustomer$;
    this.taskList$ = this.customerService.currentCustomer$.pipe(
      switchMap(customer =>
        customer?._id ? this.customerService.getTasks(customer._id) : of([])
      )
    );
  }

  logout(): void {
    this.customerService.clearCurrentCustomer();
    this.router.navigate(['/login']);
  }

  addTask(customerId: string) {
    if (!customerId || !this.task.trim()) return;

    this.taskList$ = this.customerService.addTask(customerId, this.task).pipe(
      tap(() => (this.task = ''))
    );
  }

  deleteTask(customerId: string, id: number) {
    if (!customerId) return;
    this.taskList$ = this.customerService.deleteTask(customerId, id);
  }
}
