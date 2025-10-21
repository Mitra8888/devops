import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private api = 'http://localhost:3000/api/customers';

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$= this.customersSubject.asObservable();
  constructor(private http: HttpClient) { }

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
    sessionStorage.setItem('currentCustomer', JSON.stringify(customer));
  }

  getCurrentCustomer(): Customer | null {
    return this.currentCustomerSubject.value;
  }

  clearCurrentCustomer(): void {
    this.currentCustomerSubject.next(null);
    sessionStorage.removeItem('currentCustomer');
  }

  isLoggedIn(): boolean {
    return this.customersSubject.value.length !== 0;
  }
}
