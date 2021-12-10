import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JacpotslottableComponent } from './jacpotslottable.component';

describe('JacpotslottableComponent', () => {
  let component: JacpotslottableComponent;
  let fixture: ComponentFixture<JacpotslottableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacpotslottableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacpotslottableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
