import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPageComponent } from './viewpage.component';

describe('ViewpageComponent', () => {
  let component: ViewPageComponent;
  let fixture: ComponentFixture<ViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
