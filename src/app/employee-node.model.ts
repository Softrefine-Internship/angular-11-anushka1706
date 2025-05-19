import { Employee } from './employee.model';

export interface EmployeeNode {
  employee: Employee;
  subordinates: EmployeeNode[];
}
