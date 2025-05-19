import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrdinateDialogComponent } from './sub-ordinate-dialog.component';

describe('SubOrdinateDialogComponent', () => {
  let component: SubOrdinateDialogComponent;
  let fixture: ComponentFixture<SubOrdinateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubOrdinateDialogComponent]
    });
    fixture = TestBed.createComponent(SubOrdinateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
