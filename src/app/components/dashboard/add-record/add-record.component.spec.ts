import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordComponent } from './add-record.component';

describe('AddRecordComponent', () => {
  let component: AddRecordComponent;
  let fixture: ComponentFixture<AddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
