export class Customer{
    _id!: string;
    name!: string;
    email!: string;
    phone!: string;
    role!: 'custoemer' | 'admin';
    date!:Date
}