import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdoorVerticalComponent } from './outdoor-vertical.component';

describe('OutdoorVerticalComponent', () => {
  let component: OutdoorVerticalComponent;
  let fixture: ComponentFixture<OutdoorVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutdoorVerticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutdoorVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
