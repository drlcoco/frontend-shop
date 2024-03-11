import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwningSystemComponent } from './awning-system.component';

describe('AwningSystemComponent', () => {
  let component: AwningSystemComponent;
  let fixture: ComponentFixture<AwningSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwningSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwningSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
