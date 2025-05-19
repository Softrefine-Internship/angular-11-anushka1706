import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-subordinate-dialog',
  templateUrl: './sub-ordinate-dialog.component.html',
  styleUrls: ['./sub-ordinate-dialog.component.scss']
})
export class SubordinateDialogComponent {
  subordinate: Partial<Employee> = {
    name: '',
    email: '',
    designation: '',
    imageUrl: ''
  };

  constructor(
    public dialogRef: MatDialogRef<SubordinateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { manager: Employee; levelMap: Employee[][] }
  ) { }


  get canAdd(): boolean {
    return (this.data.manager.subordinates?.length || 0) < 5;
  }

  onSubmit(): void {
    if (!this.canAdd) return;

    const newEmployee: Employee = {
      id: 0,
      name: this.subordinate.name!,
      email: this.subordinate.email!,
      designation: this.subordinate.designation!,
      imageUrl: this.subordinate.imageUrl!,
      managerId: this.data.manager.id,
      subordinates: []
    };

    this.dialogRef.close(newEmployee);
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {

      this.subordinate.imageUrl = file.name;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
