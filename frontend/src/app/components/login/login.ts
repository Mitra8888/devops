import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  LoginFormControl!: FormGroup;
  loginData: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customerService: CustomerService

  ) { }

  ngOnInit(): void {
    this.LoginFormControl = this.formBuilder.group({
      email: [''],
      phone: ['']
    });
    this.getCustomers();
  }

  getCustomers(): void {
    const url = '/api/customers';
    this.http.get<Customer[]>(url).subscribe({
      next: (res) => {
        console.log('Customers fetched successfully');
        this.loginData = res;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
      }
    });
  }

  onLogin(): void {
    this.LoginFormControl.markAllAsTouched();

    if (this.LoginFormControl.valid) {
      const { email, phone } = this.LoginFormControl.value;
      let loggedInCustomer: Customer | undefined;

      loggedInCustomer = this.loginData.find(customer =>
        customer.email === email && customer.phone === phone
      );

      if (loggedInCustomer) {
        this.customerService.setCurrentCustomer(loggedInCustomer);
        this.router.navigate(['/home']);
      } else {
        alert('Invalid email or phone number. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
  onSign(): void {
    this.router.navigate(['/signup']);
  }
}

