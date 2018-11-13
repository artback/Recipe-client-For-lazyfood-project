import {Component, OnInit} from '@angular/core';
import {Globals} from '../../Injectable/globals';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import {NumberValidator} from '../../Injectable/NumberValidator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class EditProfileComponent implements OnInit {
  img;
  profileForm: FormGroup;
  get Name() {
    return this.profileForm.get('name');
  }
  get adress() {
    return this.profileForm.get('adress') as FormGroup;
  }
  onFileSelected(files) {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = ((theFile) => {
        return (e) => {
          this.img = e.target.result;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
    }
  }
  ngOnInit() {
    this.createForm();
    this.userService.getUserData().subscribe((user) => {
      this.img = user.img;
      delete user.img;
      this.profileForm.patchValue(user);
    });
  }
  constructor(public userService: UserService,
              public globals: Globals,
              public router: Router, private fb: FormBuilder) {}
  editProfile() {
    // tslint:disable-next-line
    let user = this.profileForm.value;
    user.img = this.img;
    this.userService.editUser(user).subscribe();
  }
  createForm() {
    const adress = this.fb.group({
      address: '',
      co: '',
      state: '',
      city: '',
      postalcode: ['', [NumberValidator.numeric]]
    });
    this.profileForm = this.fb.group({
      surname: ['', [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      forename: ['', [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      adress: adress
    });
  }
}
