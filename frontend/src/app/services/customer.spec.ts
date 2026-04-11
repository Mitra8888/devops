import { Customer } from '../models/customer.model';

describe('Customer', () => {
  it('should be created', () => {
    const customer: Customer = {} as Customer;
    expect(customer).toBeTruthy();
  });
});