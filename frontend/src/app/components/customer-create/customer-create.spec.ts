import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreate } from './customer-create';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('CustomerCreate', () => {
  let component: CustomerCreate;
  let fixture: ComponentFixture<CustomerCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCreate],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
