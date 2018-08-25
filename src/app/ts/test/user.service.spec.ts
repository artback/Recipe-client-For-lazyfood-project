import { addProviders, inject } from '@angular/core/testing';
import { UserService } from '../Services/user.service';

describe('UserServiceTest', () => {
  beforeEach(() => {
    addProviders([UserService]);
  });

  it('#isLoggedIn should return false after creation', inject([UserService], (service: UserService) => {
    expect(service.isLoggedIn()).toBeFalsy();
  }));
});
