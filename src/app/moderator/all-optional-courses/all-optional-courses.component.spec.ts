import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOptionalCoursesComponent } from './all-optional-courses.component';

describe('AllOptionalCoursesComponent', () => {
  let component: AllOptionalCoursesComponent;
  let fixture: ComponentFixture<AllOptionalCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOptionalCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOptionalCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
