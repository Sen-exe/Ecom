import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjobComponent } from './viewjob.component';

describe('ViewjobComponent', () => {
  let component: ViewjobComponent;
  let fixture: ComponentFixture<ViewjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewjobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
