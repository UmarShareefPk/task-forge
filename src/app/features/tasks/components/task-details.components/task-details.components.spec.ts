import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsComponents } from './task-details.components';

describe('TaskDetailsComponents', () => {
  let component: TaskDetailsComponents;
  let fixture: ComponentFixture<TaskDetailsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
