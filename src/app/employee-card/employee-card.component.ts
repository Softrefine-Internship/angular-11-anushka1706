
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

  toggleSubordinates(e: Event) {
    e.preventDefault()
    if (!this.employee.subordinates?.length) return;
    this.toggleSub.emit(this.employee.id);
  }

  onAddSubordinate(e: Event) {
    e.stopPropagation()
    this.addSubordinate.emit(this.employee.id);
  }

  onRemoveEmployee(e: Event) {
    e.stopPropagation()
    this.remove.emit(this.employee.id);
  }

  onChangeManager(e: Event) {
    e.stopPropagation()
    this.changeManager.emit(this.employee.id);
  }
}
