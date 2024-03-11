import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleatedComponent } from './pleated.component';

describe('PleatedComponent', () => {
  let component: PleatedComponent;
  let fixture: ComponentFixture<PleatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PleatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PleatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
