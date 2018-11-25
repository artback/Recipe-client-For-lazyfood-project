import {FormBuilder, Validators} from '@angular/forms';

let fb = new FormBuilder();
const address = fb.group({
  street_name: '',
  co: '',
  state: '',
  city: '',
  postalcode: '',
});
export const profileForm = fb.group({
  username: [''],
  password: [''],
  surname: ['', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(255)
  ]],
  forename: ['', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(255)
  ]],
  address: address
});

