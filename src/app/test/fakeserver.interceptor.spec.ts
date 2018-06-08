import { TestBed, async } from '@angular/core/testing';
import {FakeBackendInterceptor} from '../ts/fakeserver.interceptor';
import {HttpHeaders} from '@angular/common/http';
describe('fakeServer', () => {
  it('should test the username ', async(() => {
    const fake = new FakeBackendInterceptor();
    const userAndPass = FakeBackendInterceptor.getUsernameAndPasswordFromHeader('Basic YXBhOnBhc3N3b3Jk');
    expect(userAndPass.username).toBe('apa');
  }));
  it('should test the password', async(() => {
    const fake = new FakeBackendInterceptor();
    const userAndPass = FakeBackendInterceptor.getUsernameAndPasswordFromHeader('Basic YXBhOnBhc3N3b3Jk');
    expect(userAndPass.password).toBe('password');
  }));
});
