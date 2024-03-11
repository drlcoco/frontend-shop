import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomStructuresComponent } from './custom-structures.component';

describe('CustomStructuresComponent', () => {
  let component: CustomStructuresComponent;
  let fixture: ComponentFixture<CustomStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomStructuresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
