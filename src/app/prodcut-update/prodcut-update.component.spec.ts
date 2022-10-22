import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutUpdateComponent } from './prodcut-update.component';

describe('ProdcutUpdateComponent', () => {
  let component: ProdcutUpdateComponent;
  let fixture: ComponentFixture<ProdcutUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdcutUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdcutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
