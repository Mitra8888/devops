import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin-guard';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});