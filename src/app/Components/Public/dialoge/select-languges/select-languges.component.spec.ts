import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLangugesComponent } from './select-languges.component';

describe('SelectLangugesComponent', () => {
  let component: SelectLangugesComponent;
  let fixture: ComponentFixture<SelectLangugesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLangugesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLangugesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
