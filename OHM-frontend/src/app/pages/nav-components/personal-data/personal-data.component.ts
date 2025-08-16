import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-personal-data',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit {

  user: any;

  personalForm!: FormGroup;
  staticForm!: FormGroup;
  editMode = false;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.employeeService.getMyProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.initForm();
      },
      error: () => {
        alert('Error fetching profile:');
      }
    });
    this.initForm();
  }

  initForm() {
    this.personalForm = this.formBuilder.group({
      FullName: [{ value: this.user.FullName, disabled: true }, Validators.required],
      Email: [{ value: this.user.Email, disabled: true }, [Validators.required, Validators.email]],
      Phone: [{ value: this.user.Phone, disabled: true }],
      Address: [{ value: this.user.Address, disabled: true }],
      UserName: [{ value: this.user.UserName, disabled:true}],
      Password: [{ value: '', disabled:true},]
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.personalForm.enable();
    } else {
      this.personalForm.disable();
    }
  }

  onSubmit() {
    if (this.personalForm.invalid) return;

    const updatedData = this.personalForm.value;
    this.employeeService.updateMyProfile(updatedData).subscribe({
      next: (res) => {
        this.user = { ...this.user, ...updatedData };
        this.editMode = false;
        alert('Profile updated successfully');
      },
      error: () => {
        alert('Failed to update profile');
      }
    });
  }
}
