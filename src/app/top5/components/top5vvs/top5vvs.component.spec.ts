import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5vvsComponent } from './top5vvs.component';

describe('Top5vvsComponent', () => {
  let component: Top5vvsComponent;
  let fixture: ComponentFixture<Top5vvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top5vvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top5vvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
