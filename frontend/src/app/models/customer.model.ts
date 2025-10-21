export class Customer{
    _id!: string;
    name!: string;
    email!: string;
    phone!: string;
    role!: 'customer' | 'admin';
    date!:Date
}