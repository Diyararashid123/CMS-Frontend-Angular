import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpageComponent } from './editpage.component';

describe('EditpageComponent', () => {
  let component: EditpageComponent;
  let fixture: ComponentFixture<EditpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
