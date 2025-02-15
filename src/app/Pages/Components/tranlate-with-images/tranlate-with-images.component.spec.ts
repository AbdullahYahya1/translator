import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranlateWithImagesComponent } from './tranlate-with-images.component';

describe('TranlateWithImagesComponent', () => {
  let component: TranlateWithImagesComponent;
  let fixture: ComponentFixture<TranlateWithImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranlateWithImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranlateWithImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
