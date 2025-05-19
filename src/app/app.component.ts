import { Component, OnInit } from '@angular/core';
import employeeData from './employee-data.json';
import { Employee } from './employee.model';
import { MatDialog } from '@angular/material/dialog';
import { SubordinateDialogComponent } from './sub-ordinate-dialog/sub-ordinate-dialog.component';
import { ManagerDialogComponent } from './manager-dialog/manager-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  displayLevels: Employee[][] = [];
  levelMap: { [key: number]: Employee[] } = {}

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employees = employeeData;

    const ceo = this.employees.find(e => e.managerId === null);
    if (ceo) {
      ceo.showSubordinates = false;
    }

    this.buildLevelMap();
    this.buildDisplayLevelsFromMap();
  }
  buildDisplayLevelsFromMap() {
    this.displayLevels = [];

    const levelZero = this.levelMap[0]?.filter(e => e.managerId === null) || [];
    if (levelZero.length === 0) return;

    this.displayLevels.push(levelZero);

    let currentLevel = levelZero;
    let level = 1;

    while (currentLevel.length > 0 && this.levelMap[level]) {
      const nextLevel: Employee[] = [];

      for (const emp of currentLevel) {
        if (emp.showSubordinates) {
          const subs = this.levelMap[level].filter(e => e.managerId === emp.id);
          nextLevel.push(...subs);
        }
      }

      if (nextLevel.length > 0) {
        this.displayLevels.push(nextLevel);
        currentLevel = nextLevel;
        level++;
      } else {
        break;
      }
    }
  }

  buildLevelMap() {
    this.levelMap = {};

    const ceo = this.employees.find(e => e.managerId === null);
    if (ceo) {
      this._buildLevelRecursive(ceo, 0);
    }
  }

  private _buildLevelRecursive(employee: Employee, level: number): void {
    if (!this.levelMap[level]) {
      this.levelMap[level] = [];
    }

    this.levelMap[level].push(employee);

    const subordinates = this.employees.filter(e => e.managerId === employee.id);

    for (const sub of subordinates) {
      this._buildLevelRecursive(sub, level + 1);
    }
  }

  buildDisplayLevels() {
    this.displayLevels = [];
    const levelZero = this.employees.filter(e => e.managerId === null);
    if (levelZero.length === 0) return;

    this.displayLevels.push(levelZero);

    let currentLevel = levelZero;

    while (currentLevel.length > 0) {
      const nextLevel: Employee[] = [];

      for (const emp of currentLevel) {
        if (emp.showSubordinates) {
          const subs = this.employees.filter(e => e.managerId === emp.id);
          nextLevel.push(...subs);
        }
      }

      if (nextLevel.length > 0) {
        this.displayLevels.push(nextLevel);
        currentLevel = nextLevel;
      } else {
        break;
      }
    }
    console.log(this.displayLevels)
  }

  onShowSubordinates(emp: Employee, levelIndex: number) {
    const levelEmps = this.displayLevels[levelIndex];

    for (let otherEmp of levelEmps) {
      if (otherEmp !== emp) {
        otherEmp.showSubordinates = false;
      }
    }

    emp.showSubordinates = !emp.showSubordinates;

    this.buildDisplayLevelsFromMap();
  }
  onAddSubordinate(manager: Employee, level: number) {
    const dialogRef = this.dialog.open(SubordinateDialogComponent, {
      data: { manager }
    });

    dialogRef.afterClosed().subscribe((newEmp: Employee) => {
      if (!newEmp) return;

      this.levelMap = this.employeeService.addEmployee(newEmp, manager, level, this.levelMap);
      this.buildDisplayLevelsFromMap()
    });
  }

  openManagerDialog(emp: Employee,level:number): void {
    const allEmployees: Employee[] = Object.values(this.levelMap)
    .flat()
    .filter(e => e.id !== emp.id); 
    const dialogRef = this.dialog.open(ManagerDialogComponent, {
      width: '400px',
      data: {
        currentEmployee: emp,
        allEmployees:allEmployees
      }
    });

    dialogRef.afterClosed().subscribe((selectedManager: Employee) => {
      if (selectedManager) {
        this.onChangeManager(this.levelMap, selectedManager, emp);
      }
    });
  }

  onRemoveEmployee(emp: Employee, level: number): void {
    const hasSubordinates = this.hasSubordinates(emp, level, this.levelMap);

    if (hasSubordinates) {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          title: 'Action Not Allowed',
          message: `${emp.name} cannot be removed because they have subordinates.`
        }
      });
      return;
    }
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      data: {
        title: 'Confirm Removal',
        message: `Are you sure you want to remove ${emp.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        try {
          this.levelMap = this.employeeService.removeEmployee(emp, level, this.levelMap);
          this.buildDisplayLevelsFromMap();
        } catch (error: any) {
          this.dialog.open(ErrorDialogComponent, {
            data: {
              title: 'Action Not Allowed',
              message: error.message || 'Unable to remove employee.'
            }
          });
        }
      }
    });
  }

  hasSubordinates(emp: Employee, level: number, levelMap: { [key: number]: Employee[] }): boolean {
    const nextLevel = level + 1;
    const subordinates = levelMap[nextLevel]?.filter(e => e.managerId === emp.id) || [];
    return subordinates.length > 0;
  }

  onChangeManager(
    levelMap: { [key: number]: Employee[] },
    selectedEmp: Employee,
    managerEmp: Employee
  ): void {
    if (!selectedEmp || !managerEmp) return;

    let selectedFromMap: Employee | undefined;
    let managerFromMap: Employee | undefined;

    for (const level in levelMap) {
      for (const emp of levelMap[level]) {
        if (emp.id === selectedEmp.id) selectedFromMap = emp;
        if (emp.id === managerEmp.id) managerFromMap = emp;
      }
    }

    if (!selectedFromMap || !managerFromMap) return;

    const temp = {
      name: selectedFromMap.name,
      email: selectedFromMap.email,
      imageUrl: selectedFromMap.imageUrl
    };

    selectedFromMap.name = managerFromMap.name;
    selectedFromMap.email = managerFromMap.email;
    selectedFromMap.imageUrl = managerFromMap.imageUrl;

    managerFromMap.name = temp.name;
    managerFromMap.email = temp.email;
    managerFromMap.imageUrl = temp.imageUrl;

    this.buildDisplayLevelsFromMap();
  }

}
