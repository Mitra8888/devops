import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { Customer } from '../../models/customer.model';
import { CommonModule } from '@angular/common';
import {  MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customer-details',
  imports: [CommonModule, RouterLink, MatButtonModule, FormsModule],
  templateUrl: './customer-details.html',
  styleUrl: './customer-details.css'
})
export class CustomerDetails implements OnInit {
  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customerID!: string;
  customer!: Customer;

  task: string ='';
  taskList: {id: number, name: string}[] =[]
  ngOnInit(): void {
    // get customer id from url
    this.customerID = this.activatedRouter.snapshot.params['id'];
    
   if (this.customerID) {
    this.customerService.getById(this.customerID).subscribe({
      next: (data) => {
        console.log ('Customer data fro mservice:', data);

       this.customer = Array.isArray(data) ? data[0] : data;

       if (this.customer?._id){
        this.customerService.getTasks(this.customer._id).subscribe(tasks =>{
          this.taskList = tasks;
        })
       }
      }
    })
   }
   
  }

  addTask() {
    if (!this.customer?._id || !this.task.trim()) return;
    
    this.customerService.addTask(this.customer._id, this.task).subscribe(tasks =>{
      this.taskList = tasks;
      this.task = ''
    })
  }
  deleteTask(id: number){
     if (!this.customer?._id) return;

     this.customerService.deleteTask(this.customer._id, id).subscribe(tasks =>{
       this.taskList = tasks;
     })
   }
}
