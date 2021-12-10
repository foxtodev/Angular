import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearWinnerTableComponent } from './clear-winner-table.component';

describe('ClearWinnerTableComponent', () => {
  let component: ClearWinnerTableComponent;
  let fixture: ComponentFixture<ClearWinnerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearWinnerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearWinnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
