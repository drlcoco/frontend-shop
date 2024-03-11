import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetractableComponent } from './retractable.component';

describe('RetractableComponent', () => {
  let component: RetractableComponent;
  let fixture: ComponentFixture<RetractableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetractableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetractableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
