import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubordinateDialogComponent } from './add-sub-ordinate-dialog.component';

describe('SubOrdinateDialogComponent', () => {
  let component: SubordinateDialogComponent;
  let fixture: ComponentFixture<SubordinateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubordinateDialogComponent]
    });
    fixture = TestBed.createComponent(SubordinateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
