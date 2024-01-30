import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private _demoService:DemoService) {
    this.profileForm = this.fb.group({
      profilePicture: [null, [this.profilePictureValidator]],
      firstName: ['', [Validators.required, this.firstNameValidator]],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      addressType: ['', Validators.required],
      homeAddress1: [''],
      homeAddress2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      hobbies: ['', Validators.required],
      subscribeToNewsletter: [false],
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.profileForm.value;

    console.log(formValue);
    this.dialog.closeAll();
    this._demoService.postData(formValue)
    // .subscribe(data => {
    //   console.log(data);

    //   this.dialog.closeAll();
    //   this._router.navigateByUrl('/profile');
    // })
  }

  profilePictureValidator(control: FormControl) {
    const file = control.value as File;

    if (file) {
      const image = new Image();

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        // Check if the image size is within the specified limits
        if (width === 310 && height === 325) {
          control.setErrors(null);  // Image size is valid
        } else {
          control.setErrors({ invalidSize: true });  // Image size is invalid
        }
      };

      image.src = URL.createObjectURL(file);
    }

    return null;
  }

  // Custom validator function for the First Name field
  firstNameValidator(control: FormControl) {
    const value = control.value;

    // Check if the value contains only alphabetic characters and length is not more than 20
    const regex = /^[a-zA-Z]+$/;
    const isValid = regex.test(value) && value.length <= 20;

    return isValid ? null : { invalidFirstName: true };
  }

}
