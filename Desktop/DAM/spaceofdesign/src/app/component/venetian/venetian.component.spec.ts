import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenetianComponent } from './venetian.component';

describe('VenetianComponent', () => {
  let component: VenetianComponent;
  let fixture: ComponentFixture<VenetianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenetianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenetianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
