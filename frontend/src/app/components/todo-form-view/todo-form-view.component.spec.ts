import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormViewComponent } from './todo-form-view.component';

describe('TodoFormViewComponent', () => {
  let component: TodoFormViewComponent;
  let fixture: ComponentFixture<TodoFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
