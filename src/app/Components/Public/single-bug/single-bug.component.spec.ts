import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBugComponent } from './single-bug.component';

describe('SingleBugComponent', () => {
  let component: SingleBugComponent;
  let fixture: ComponentFixture<SingleBugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
