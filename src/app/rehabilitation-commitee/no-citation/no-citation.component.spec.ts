import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCitationComponent } from './no-citation.component';

describe('NoCitationComponent', () => {
  let component: NoCitationComponent;
  let fixture: ComponentFixture<NoCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoCitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
