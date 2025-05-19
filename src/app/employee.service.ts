import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private dataObserver = new BehaviorSubject<{ [level: number]: Employee[] }>({});
  private levelMap: { [level: number]: Employee[] } = {};

  setInitialData(data: { [level: number]: Employee[] }) {
    this.levelMap = data;
    this.dataObserver.next(this.levelMap);
  }
  setDataObserver(employees: {}) {
    this.dataObserver.next(employees)
  }
  getDataObserver() {
    return this.dataObserver;
  }

  addEmployee(
    newEmp: Employee,
    manager: Employee,
    level: number,
    levelMap: { [key: number]: Employee[] }
  ): { [key: number]: Employee[] } {
    const allEmployees = Object.values(levelMap).flat();
    const maxId = allEmployees.length ? Math.max(...allEmployees.map(e => e.id ?? 0)) : 0;

    newEmp.id = maxId + 1;
    newEmp.managerId = manager.id;
    const nextLevel = level + 1;
    if (!levelMap[nextLevel]) {
      levelMap[nextLevel] = [];
    }
    levelMap[nextLevel].push(newEmp);

    const managerRef = allEmployees.find(e => e.id === manager.id);
    if (managerRef) {
      managerRef.subordinates = managerRef.subordinates || [];
      managerRef.subordinates.push(newEmp.id);
    }

    return levelMap;
  } removeEmployee(
    emp: Employee,
    level: number,
    levelMap: { [key: number]: Employee[] }
  ): { [key: number]: Employee[] } {

    const index = levelMap[level]?.findIndex(e => e.id === emp.id) ?? -1;
    if (index !== -1) {
      levelMap[level].splice(index, 1);
    }

    let manager: Employee | undefined;
    for (const lvl in levelMap) {
      manager = levelMap[lvl].find(e => e.id === emp.managerId);
      if (manager) break;
    }

    if (manager?.subordinates) {
      manager.subordinates = manager.subordinates.filter(id => id !== emp.id);
    }

    return levelMap;
  }
}
