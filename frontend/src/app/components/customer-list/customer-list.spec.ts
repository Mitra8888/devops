import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerList } from './customer-list';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('CustomerList', () => {
  let component: CustomerList;
  let fixture: ComponentFixture<CustomerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerList],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
