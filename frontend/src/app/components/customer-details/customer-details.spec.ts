import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetails } from './customer-details';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('CustomerDetails', () => {
  let component: CustomerDetails;
  let fixture: ComponentFixture<CustomerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetails],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
