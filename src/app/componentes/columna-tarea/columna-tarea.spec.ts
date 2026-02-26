import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnaTarea } from './columna-tarea';

describe('ColumnaTarea', () => {
  let component: ColumnaTarea;
  let fixture: ComponentFixture<ColumnaTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnaTarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnaTarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
