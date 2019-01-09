import {Component, OnInit} from '@angular/core';
import { FormGroup} from '@angular/forms';
import {UserService} from '../../Services';
import {profileForm} from '../../Models';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  private img;
  get Name() {
    return this.profileForm.get('name');
  }
  get Address() {
    return this.profileForm.get('address') as FormGroup;
  }
  onFileSelected(files) {
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = ((user) => {
        return (e) => {
          this.img = e.target.result;
        };
      })(files[0]);
      reader.readAsDataURL(files[0]);
    }
  }
  ngOnInit() {
    this.profileForm = profileForm;
    this.userService.getUserData().subscribe((user) => {
      this.img = user.img;
      delete user.img;
      this.profileForm.patchValue(user);
    });
  }
  constructor(public userService: UserService) {}
  editProfile() {
    // tslint:disable-next-line
    let user = this.profileForm.value;
    user.img = this.img;
    this.userService.editUser(user).subscribe();
  }
}
