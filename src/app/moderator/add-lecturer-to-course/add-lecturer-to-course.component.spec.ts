import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecturerToCourseComponent } from './add-lecturer-to-course.component';

describe('AddLecturerToCourseComponent', () => {
  let component: AddLecturerToCourseComponent;
  let fixture: ComponentFixture<AddLecturerToCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLecturerToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLecturerToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
