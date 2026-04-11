import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEdit } from './customer-edit';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomerEdit', () => {
  let component: CustomerEdit;
  let fixture: ComponentFixture<CustomerEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEdit],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
