import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CustomerService } from "../services/customer";




@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const role = this.customerService.getCurrentCustomerRole();

    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}