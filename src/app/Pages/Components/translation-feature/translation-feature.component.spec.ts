import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationFeatureComponent } from './translation-feature.component';

describe('TranslationFeatureComponent', () => {
  let component: TranslationFeatureComponent;
  let fixture: ComponentFixture<TranslationFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
