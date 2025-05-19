
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;

  @Output() toggleSub = new EventEmitter<number>();
  @Output() addSubordinate = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() changeManager = new EventEmitter<number>();

  toggleSubordinates() {
    this.toggleSub.emit(this.employee.id);
  }

  onAddSubordinate() {
    this.addSubordinate.emit(this.employee.id);
  }

  onRemoveEmployee() {
    this.remove.emit(this.employee.id);
  }

  onChangeManager() {
    this.changeManager.emit(this.employee.id);
  }
}
