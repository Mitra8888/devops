import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-customer-edit',
  imports: [RouterModule,CommonModule, ReactiveFormsModule, MatFormField, MatLabel, MatIcon],
  templateUrl: './customer-edit.html',
  styleUrl: './customer-edit.css'
})
export class CustomerEdit implements OnInit {

  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customerId!: string;
  customer!: Customer;
  form!: FormGroup;
  router = inject(Router);
  ngOnInit(): void {
    this.customerId = this.activatedRouter.snapshot.params['id'];
    
     this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
    });

    if (this.customerId) {
      this.customerService.getById(this.customerId).subscribe(
        data => {
          this.customer = data;
          this.form.patchValue(data);
        }, error => {
          console.error('Error fetching customer details: ', error);
        })
    }
   
  }
  onSubmit() {
    if (this.form.valid) {
      this.customerService.put(this.customerId, this.form.value).subscribe(data => {
        console.log('Customer updated: ', data);
        this.router.navigate(['/']);
      },
        error => {
          console.error('Error updating customer: ', error);
        });
    }
  }


}
