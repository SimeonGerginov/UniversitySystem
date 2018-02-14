import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeworkToCourseComponent } from './add-homework-to-course.component';

describe('AddHomeworkToCourseComponent', () => {
  let component: AddHomeworkToCourseComponent;
  let fixture: ComponentFixture<AddHomeworkToCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeworkToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeworkToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
