import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel, MatInput, MatError } from "@angular/material/input";
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-signup',
  imports: [MatIcon, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, CommonModule, MatAnchor, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  signupFormControl: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ){
    this.signupFormControl = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      date: ['',Validators.required]
    });
  }

  onClick(): void{
    this.signupFormControl.markAllAsTouched();
    this.successMessage = null;
    this.errorMessage = null;

    if (this.signupFormControl.valid){
    const newCustomer = {
      ...this.signupFormControl.value,
      role: 'customer'
    }

      const url = 'http://localhost:3000/api/customers';
      this.http.post<Customer>(url, newCustomer).subscribe({
        next: (response) => {
          console.log('Signed up successfully', response);
          this.successMessage = 'Signup successfull! Redirecting to Login';
          setTimeout(()=>{
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          console.error('Signup failed', error);
          this.errorMessage = 'Signup failed';
        }
      });
    }else{
      this.errorMessage = 'Please fix the form errors';
    }
  }
  
  goToLogin(): void{
    this.router.navigate(['/login']);
  }

}
