import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequiredCoursesComponent } from './all-required-courses.component';

describe('AllRequiredCoursesComponent', () => {
  let component: AllRequiredCoursesComponent;
  let fixture: ComponentFixture<AllRequiredCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequiredCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequiredCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
