import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormEditComponent } from './todo-form-edit.component';

describe('TodoFormEditComponent', () => {
  let component: TodoFormEditComponent;
  let fixture: ComponentFixture<TodoFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
