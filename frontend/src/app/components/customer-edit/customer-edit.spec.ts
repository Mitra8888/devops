import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEdit } from './customer-edit';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('CustomerEdit', () => {
  let component: CustomerEdit;
  let fixture: ComponentFixture<CustomerEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEdit],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
