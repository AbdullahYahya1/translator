import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateOptionsComponent } from './translate-options.component';

describe('TranslateOptionsComponent', () => {
  let component: TranslateOptionsComponent;
  let fixture: ComponentFixture<TranslateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
