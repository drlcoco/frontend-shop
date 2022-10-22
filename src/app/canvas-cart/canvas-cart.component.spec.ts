import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCartComponent } from './canvas-cart.component';

describe('CanvasCartComponent', () => {
  let component: CanvasCartComponent;
  let fixture: ComponentFixture<CanvasCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
