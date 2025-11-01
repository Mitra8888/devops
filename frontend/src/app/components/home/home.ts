import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatAnchor } from "@angular/material/button";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatAnchor, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy{

  currentCustomer: Customer | null = null;
  private customerSubscription: Subscription | undefined;
  task="";
  taskList:{id:number,name:string}[]=[]

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerSubscription = this.customerService.currentCustomer$.subscribe(customer => {
      this.currentCustomer = customer;

      if (customer?._id){
        this.customerService.getTasks(customer._id).subscribe(tasks => {
          this.taskList = tasks;
        })
      }
    });
  }
  ngOnDestroy(): void {
    this.customerSubscription?.unsubscribe();
  }

  logout(): void {
    this.customerService.clearCurrentCustomer();
    this.router.navigate(['/login']);
  }

  addTask(){
    if(!this.currentCustomer?._id|| !this.task.trim()) return;
    
    this.customerService.addTask(this.currentCustomer._id, this.task).subscribe(task =>{
      this.taskList = this.taskList;
      this.task = ""
    })
   
  }
  
  deleteTask(id:number){
    if (!this.currentCustomer?._id) return;
    this.customerService.deleteTask(this.currentCustomer._id, id).subscribe(tasks =>{
      this.taskList = tasks;
    })
  }
}
