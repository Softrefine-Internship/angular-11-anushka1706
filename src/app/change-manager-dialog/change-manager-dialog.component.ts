import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-manager-dialog',
  templateUrl: './change-manager-dialog.component.html',
  styleUrls: ['./change-manager-dialog.component.scss']
})
export class ManagerDialogComponent {
  selectedEmployee: Employee | null = null;
  filteredEmployees: Employee[] = [];
  optionSelected !: Employee
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { allEmployees: Employee[]; currentEmployee: Employee },
    private dialogRef: MatDialogRef<ManagerDialogComponent>
  ) { }

  filterEmployees(event: Event): void {
    console.log(this.data.allEmployees
    )
    const input = event.target as HTMLInputElement;
    const query = input.value;
    if (!query) {
      this.filteredEmployees = [];
    } else {
      this.filteredEmployees = this.data.allEmployees.filter(emp =>
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
  displayEmployee(employee: any): string {
    return employee ? employee.name : '';
  }
  onEmployeeSelected(employee: Employee): void {
    this.optionSelected = employee
  }
  onSave() {
    this.dialogRef.close(this.optionSelected);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
