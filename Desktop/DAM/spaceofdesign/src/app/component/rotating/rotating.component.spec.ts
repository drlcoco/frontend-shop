import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingComponent } from './rotating.component';

describe('RotatingComponent', () => {
  let component: RotatingComponent;
  let fixture: ComponentFixture<RotatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
