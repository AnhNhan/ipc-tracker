import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeafieldsComponent } from './seafields.component';

describe('SeafieldsComponent', () => {
  let component: SeafieldsComponent;
  let fixture: ComponentFixture<SeafieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeafieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeafieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
