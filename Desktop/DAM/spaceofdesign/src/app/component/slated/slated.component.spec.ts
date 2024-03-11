import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlatedComponent } from './slated.component';

describe('SlatedComponent', () => {
  let component: SlatedComponent;
  let fixture: ComponentFixture<SlatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
