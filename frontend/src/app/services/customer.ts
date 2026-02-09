import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private api = '/api/customers';

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$= this.customersSubject.asObservable();
  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
  const storedCustomer = localStorage.getItem('currentCustomer');
  if (storedCustomer) {
    this.currentCustomerSubject.next(JSON.parse(storedCustomer));
  }
}
   }

  private currentCustomerSubject = new BehaviorSubject<Customer | null>(null);
  currentCustomer$ = this.currentCustomerSubject.asObservable();

  loadCustomers(): void{
    this.http.get<Customer[]>(this.api).subscribe(data => {
      this.customersSubject.next(data);
    });
  }

  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.api);
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(this.api + '/' + id);
  }

  post(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.api, customer).pipe(tap(() => this.loadCustomers()));  
  }

  put(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.api + '/' + id, customer).pipe(tap(() => this.loadCustomers()));
  }

  delete(id: string): Observable<Customer> {
    return this.http.delete<Customer>(this.api + '/' + id).pipe(tap(() => this.loadCustomers()));
  }

  getCurrentCustomerRole(): 'customer' | 'admin' | null {
    const current = this.getCurrentCustomer();
    return current ? current.role : null;
  }

  setCurrentCustomer(customer: Customer): void {
    this.currentCustomerSubject.next(customer);
    this.currentCustomerSubject.next(customer);
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentCustomer', JSON.stringify(customer));
  }
  }

  getCurrentCustomer(): Customer | null {
    return this.currentCustomerSubject.value;
  }

  clearCurrentCustomer(): void {
     this.currentCustomerSubject.next(null);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('currentCustomer');
  }
  }

  isLoggedIn(): boolean {
    return this.customersSubject.value.length !== 0;
  }

  getTasks(customerId: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.api}/${customerId}/tasks`);
  }
  addTask(customerId: string, taskName: string): Observable<any[]>{
    return this.http.post<any[]>(`${this.api}/${customerId}/tasks`, {name: taskName});
  }
  deleteTask(customerId: string, taskId: number):  Observable<any[]>{
    return this.http.delete<any[]>(`${this.api}/${customerId}/tasks/${taskId}`);
  }
}
