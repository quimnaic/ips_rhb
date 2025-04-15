import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationCommiteeComponent } from './rehabilitation-commitee.component';
import { CitationComponent } from './citation/citation.component';

describe('RehabilitationCommiteeComponent', () => {
  let component: RehabilitationCommiteeComponent;
  let fixture: ComponentFixture<RehabilitationCommiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RehabilitationCommiteeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehabilitationCommiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
