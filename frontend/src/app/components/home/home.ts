import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatAnchor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy{

  currentCustomer: Customer | null = null;
  private customerSubscription: Subscription | undefined;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerSubscription = this.customerService.currentCustomer$.subscribe(customer => {
      this.currentCustomer = customer;
    });
  }
  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
  }

  logout(): void {
    this.customerService.clearCurrentCustomer();
    this.router.navigate(['/login']);
  }

}
