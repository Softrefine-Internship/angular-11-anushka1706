import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ManagerDialogComponent } from './manager-dialog/manager-dialog.component';
import { FormsModule } from '@angular/forms';
import { SubordinateDialogComponent } from './sub-ordinate-dialog/sub-ordinate-dialog.component';
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeCardComponent,
    ManagerDialogComponent,
    SubordinateDialogComponent,
    ComfirmDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
