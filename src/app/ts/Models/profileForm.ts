import {FormBuilder, Validators} from '@angular/forms';
import {Globals} from '../Injectable/globals';
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
    Validators.minLength(Globals.NAMELENGTH)
  ]],
  forename: ['', [
    Validators.required,
    Validators.minLength(Globals.NAMELENGTH)
  ]],
  address: address
});

