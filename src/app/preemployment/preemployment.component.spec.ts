import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreemploymentComponent } from './preemployment.component';

describe('PreemploymentComponent', () => {
  let component: PreemploymentComponent;
  let fixture: ComponentFixture<PreemploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreemploymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreemploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
