import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, FormsModule],
  templateUrl: './customer-details.html',
  styleUrls: ['./customer-details.css'] // ✅ corrected plural form
})
export class CustomerDetails {
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);

  // ✅ Reactive properties
  customer$!: Observable<Customer>;
  taskList$!: Observable<{ id: number; name: string }[]>;

  task: string = '';

  constructor() {
    // When the route parameter changes, re-fetch the customer and tasks
    this.customer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of({} as Customer);
        return this.customerService.getById(id).pipe(
          tap(customer => {
            if (customer && (customer as any)._id) {
              this.taskList$ = this.customerService.getTasks((customer as any)._id);
            } else {
              this.taskList$ = of([]);
            }
          })
        );
      })
    );
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
