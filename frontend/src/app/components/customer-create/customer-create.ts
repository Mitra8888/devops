import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../services/customer';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-customer-create',
  imports: [RouterModule,MatSelectModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css'
})
export class CustomerCreate implements OnInit {

  private customerService = inject(CustomerService);
  disableSelect = new FormControl(false);
  form!: FormGroup;
  router = inject(Router);
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.customerService.post(this.form.value).subscribe(data => {
        console.log('Customer created: ', data);
        this.router.navigate(['/']);
      },
        error => {
          console.error('Error creating customer: ', error);
        });
    }
  }
  onCancel() {
this.router.navigate(['/list']);}
}
