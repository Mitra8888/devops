import { Routes } from '@angular/router';
import { CustomerList } from './components/customer-list/customer-list';
import { CustomerCreate } from './components/customer-create/customer-create';
import { CustomerDetails } from './components/customer-details/customer-details';
import { CustomerEdit } from './components/customer-edit/customer-edit';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { AdminGuard } from './guard/admin-guard';

export const routes: Routes = [
    
    {path: 'create', component: CustomerCreate, canActivate: [AdminGuard]},
    {path: 'details/:id', component: CustomerDetails, canActivate: [AdminGuard]},
    {path: 'edit/:id', component: CustomerEdit, canActivate: [AdminGuard]},
    {path: 'home', component: Home},
    {path: 'list', component: CustomerList, canActivate: [AdminGuard]},
    {path:'login', component: Login},
    {path: 'signup', component: Signup},
    {path: '', redirectTo: '/signup', pathMatch: 'full'},
    
];
