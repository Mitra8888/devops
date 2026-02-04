import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';
import { Customer } from '../../models/customer.model';
import {MatIconModule} from '@angular/material/icon';
import { error } from 'console';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {
  
 // inject customer service
 private customerService = inject(CustomerService);
// customer list
  customers: Customer[] = [];
  customers$!: Observable<Customer[]>;


ngOnInit(): void {
  this.customerService.loadCustomers();
  this.customers$ = this.customerService.customers$;
   this.initData();
  }

  initData(): void {
    this.customerService.get().subscribe(data => {
      console.log('Customers: ', data);
      this.customers = data;
    }, error => {
      console.error("error: ", error);
    });
  }

  onDeleteClick(customer: Customer): void {
   if(window.confirm('Are you sure you want to delete ' + customer.name + '?')) {
    this.customerService.delete(customer._id!).subscribe(
      data=>{
        this.initData();
      },
      error=>{
        console.error('Error deleting customer: ', error);
      }
    )  
  }
}
}
