import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customerID!: string;
  customer!: Customer;
  ngOnInit(): void {
    // get customer id from url
    this.customerID = this.activatedRouter.snapshot.params['id'];
    if (this.customerID) {
      this.customerService.getById(this.customerID).subscribe(
        data => {
          this.customer = data
        }, error => {
          console.error('Error fetching customer details: ', error);
        });
    }
    console.log('Customer ID: ', this.customerID);
  }
}
