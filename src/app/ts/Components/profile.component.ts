import {Component, Input, OnInit} from '@angular/core';
import {Globals} from '../Injectable/globals';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: '../../template/profile.html',
  styleUrls: ['../../css/profile.css'],
})

export class ProfileComponent implements OnInit {
  @Input() username: String;
  private img;
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
    if (!this.globals.isLoggedIn) {
      console.log('not logged in');
      this.router.navigate(['']);
    }
    this.createForm();
  }
  constructor(public userService: UserService,
              public globals: Globals,
              public router: Router, private fb: FormBuilder) {}
  editProfile() {
    const user = this.profileForm.value;
    user.username = this.globals.user;
    this.userService.editUser(this.profileForm.value);
  }
  createForm() {
    const user = this.globals.user;
    const adress = this.fb.group({
      address: '',
      co: '',
      state: '',
      city: '',
      postalcode: '',
    });
    this.profileForm = this.fb.group({
      surname: [user.surname, [
        Validators.required,
        Validators.minLength(this.NAMELENGTH)
      ]],
      forename: [user.forename, [
        Validators.required,
        Validators.minLength(this.globals.NAMELENGTH)
      ]],
      adress: adress
    });
  }
}
