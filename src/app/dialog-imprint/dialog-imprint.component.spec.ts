import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImprintComponent } from './dialog-imprint.component';

describe('DialogImprintComponent', () => {
  let component: DialogImprintComponent;
  let fixture: ComponentFixture<DialogImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogImprintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
