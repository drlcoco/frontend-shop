import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParasolsComponent } from './parasols.component';

describe('ParasolsComponent', () => {
  let component: ParasolsComponent;
  let fixture: ComponentFixture<ParasolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParasolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParasolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
