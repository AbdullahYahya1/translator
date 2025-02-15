import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranlateWithVoiceComponent } from './tranlate-with-voice.component';

describe('TranlateWithVoiceComponent', () => {
  let component: TranlateWithVoiceComponent;
  let fixture: ComponentFixture<TranlateWithVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranlateWithVoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranlateWithVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
