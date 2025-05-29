import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-subordinate-dialog',
  templateUrl: './add-sub-ordinate-dialog.component.html',
  styleUrls: ['./add-sub-ordinate-dialog.component.scss']
})

export class SubordinateDialogComponent implements OnInit {
  subForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { manager: Employee; levelMap: Employee[][] }
  ) { }

  ngOnInit(): void {
    this.subForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      designation: ['', Validators.required],
      imageUrl: ['']
    });
  }

  get canAdd(): boolean {
    return (this.data.manager.subordinates?.length || 0) < 5;
  }

  onSubmit(): void {
    if (!this.canAdd || this.subForm.invalid) return;

    const formValue = this.subForm.value;
    const newEmployee: Employee = {
      id: 0,
      name: formValue.name,
      email: formValue.email,
      designation: formValue.designation,
      imageUrl: formValue.imageUrl,
      managerId: this.data.manager.id,
      subordinates: []
    };
    this.dialogRef.close(newEmployee);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processImage(file);
    }
  }
  processImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.subForm.patchValue({ imageUrl: base64 });
    };
    reader.readAsDataURL(file);
  }

}
