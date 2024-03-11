import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioclimaticComponent } from './bioclimatic.component';

describe('BioclimaticComponent', () => {
  let component: BioclimaticComponent;
  let fixture: ComponentFixture<BioclimaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioclimaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioclimaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
