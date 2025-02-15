import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranlateWithTextComponent } from './tranlate-with-text.component';

describe('TranlateWithTextComponent', () => {
  let component: TranlateWithTextComponent;
  let fixture: ComponentFixture<TranlateWithTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranlateWithTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranlateWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
