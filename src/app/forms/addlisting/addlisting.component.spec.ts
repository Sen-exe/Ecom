import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlistingComponent } from './addlisting.component';

describe('AddlistingComponent', () => {
  let component: AddlistingComponent;
  let fixture: ComponentFixture<AddlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddlistingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
