import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSlimComponent } from './footer-slim.component';

describe('FooterSlimComponent', () => {
  let component: FooterSlimComponent;
  let fixture: ComponentFixture<FooterSlimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSlimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSlimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
