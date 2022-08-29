import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCostsComponent } from './employee-costs.component';

describe('EmployeeCostsComponent', () => {
  let component: EmployeeCostsComponent;
  let fixture: ComponentFixture<EmployeeCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
